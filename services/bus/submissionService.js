import fields from "../../data/fields.json" with { type: "json" };

import Submission from "../../mongoSchemas/bus/Submission.js";

import { validateValue } from "./validationService.js";

import { syncSubmissionTables } from "./tableSyncService.js";

/*
|--------------------------------------------------------------------------
| CUSTOM ERROR
|--------------------------------------------------------------------------
*/

class ServiceError extends Error {
  constructor(message, statusCode = 400, errors = null) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;

    if (errors) {
      this.errors = errors;
    }
  }
}

/*
|--------------------------------------------------------------------------
| HELPER FUNCTIONS
|--------------------------------------------------------------------------
*/

const isEmptyValue = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

const validateRequestInfo = (requestInfo) => {
  const errors = {};

  const requiredFields = [
    ["vehicleType", "Type of Vehicle"],
    ["fuelType", "Fuel Type"],
    ["certificationType", "Type of Certification"],
    ["unloadedWeightWithoutBattery", "Unloaded Weight (w/o Battery)"],
    ["category", "Category"],
    ["preferredTestingAgency", "Preferred Testing Agency"],
  ];

  for (const [fieldName, label] of requiredFields) {
    if (isEmptyValue(requestInfo?.[fieldName])) {
      errors[fieldName] = `${label} is required`;
    }
  }

  return errors;
};

/*
|--------------------------------------------------------------------------
| AUTHENTICATION CHECK
|--------------------------------------------------------------------------
*/

const validateUser = (userId) => {
  if (!userId) {
    throw new ServiceError("Authentication required", 401);
  }
};

/*
|--------------------------------------------------------------------------
| VALIDATE REQUEST INFORMATION
|--------------------------------------------------------------------------
*/

const validateRequestInfoOrThrow = (requestInfo) => {
  if (
    !requestInfo ||
    typeof requestInfo !== "object" ||
    Array.isArray(requestInfo)
  ) {
    throw new ServiceError("Request information is required", 400);
  }

  const errors = validateRequestInfo(requestInfo);

  if (Object.keys(errors).length > 0) {
    throw new ServiceError(
      "Please complete all request information",
      400,
      errors,
    );
  }
};

/*
|--------------------------------------------------------------------------
| BUILD EMPTY VEHICLE FORM
|--------------------------------------------------------------------------
*/

const buildEmptyForm = () => {
  const values = {};

  for (const field of fields) {
    if (!field.isActive) {
      continue;
    }

    if (!values[field.subCategoryId]) {
      values[field.subCategoryId] = {};
    }

    values[field.subCategoryId][field.name] = "";
  }

  return values;
};

/*
|--------------------------------------------------------------------------
| MERGE FORM VALUES
|--------------------------------------------------------------------------
| Only active fields defined in fields.json are accepted.
|--------------------------------------------------------------------------
*/

const mergeFormValues = (target, incoming) => {
  if (!incoming || typeof incoming !== "object") {
    return;
  }

  for (const field of fields) {
    if (!field.isActive) {
      continue;
    }

    const subCategoryId = field.subCategoryId;
    const fieldName = field.name;

    const incomingSubCategory = incoming[subCategoryId];

    if (
      !incomingSubCategory ||
      typeof incomingSubCategory !== "object" ||
      Array.isArray(incomingSubCategory)
    ) {
      continue;
    }

    if (!Object.prototype.hasOwnProperty.call(incomingSubCategory, fieldName)) {
      continue;
    }

    target[subCategoryId][fieldName] = incomingSubCategory[fieldName];
  }
};

/*
|--------------------------------------------------------------------------
| VALIDATE COMPLETE FORM
|--------------------------------------------------------------------------
*/

const validateCompleteForm = (values) => {
  const errors = {};

  for (const field of fields) {
    if (!field.isActive) {
      continue;
    }

    const subCategoryValues = values?.[field.subCategoryId] || {};

    const value = subCategoryValues[field.name];

    // Empty fields are allowed in draft submissions.
    if (isEmptyValue(value)) {
      continue;
    }

    const fieldErrors = validateValue(field, value);

    if (fieldErrors.length > 0) {
      if (!errors[field.subCategoryId]) {
        errors[field.subCategoryId] = {};
      }

      errors[field.subCategoryId][field.name] = fieldErrors;
    }
  }

  return errors;
};

/*
|--------------------------------------------------------------------------
| CHECK REQUIRED FORM FIELDS
|--------------------------------------------------------------------------
*/

const hasAllRequiredFieldsInForm = (values) => {
  for (const field of fields) {
    if (!field.isActive || !field.isRequired) {
      continue;
    }

    const value = values?.[field.subCategoryId]?.[field.name];

    if (isEmptyValue(value)) {
      return false;
    }
  }

  return true;
};

/*
|--------------------------------------------------------------------------
| NORMALIZE REQUEST INFORMATION
|--------------------------------------------------------------------------
*/

const normalizeRequestInfo = (requestInfo) => ({
  vehicleType: requestInfo.vehicleType,
  fuelType: requestInfo.fuelType,
  certificationType: requestInfo.certificationType,
  unloadedWeightWithoutBattery: requestInfo.unloadedWeightWithoutBattery,
  category: requestInfo.category,
  preferredTestingAgency: requestInfo.preferredTestingAgency,
});

/*
|--------------------------------------------------------------------------
| BUILD TABLE RESPONSE
|--------------------------------------------------------------------------
*/

const buildTableResponse = (tableResults) => {
  const buildOneTable = (table) => {
    if (!table) {
      return {
        id: null,
        completionPercentage: 0,
        status: "not_started",
      };
    }

    return {
      id: table._id ?? null,
      completionPercentage: table.completionPercentage ?? 0,
      status: table.status ?? "not_started",
    };
  };

  return {
    table1A: buildOneTable(tableResults?.table1A),
    table11: buildOneTable(tableResults?.table11),
    table3A: buildOneTable(tableResults?.table3A),
  };
};

/*
|--------------------------------------------------------------------------
| SYNC SEPARATE TABLE COLLECTIONS
|--------------------------------------------------------------------------
*/

const syncTables = async (submission) => {
  const tableResults = await syncSubmissionTables({
    submissionId: submission._id,
    userId: submission.userId,
    values: submission.values,
  });

  // Update an optional table summary if the schema supports it.
  if (submission.tables !== undefined) {
    submission.tables = {
      table1A: {
        completionPercentage: tableResults.table1A?.completionPercentage ?? 0,
        status: tableResults.table1A?.status ?? "not_started",
      },
      table11: {
        completionPercentage: tableResults.table11?.completionPercentage ?? 0,
        status: tableResults.table11?.status ?? "not_started",
      },
      table3A: {
        completionPercentage: tableResults.table3A?.completionPercentage ?? 0,
        status: tableResults.table3A?.status ?? "not_started",
      },
    };

    await submission.save();
  }

  return buildTableResponse(tableResults);
};

/*
|--------------------------------------------------------------------------
| CREATE SUBMISSION
|--------------------------------------------------------------------------
*/

export const createSubmission = async (userId, body = {}) => {
  validateUser(userId);

  const requestInfo = body.requestInfo;

  validateRequestInfoOrThrow(requestInfo);

  const incomingValues = body.values ?? {};

  if (
    !incomingValues ||
    typeof incomingValues !== "object" ||
    Array.isArray(incomingValues)
  ) {
    throw new ServiceError("Values must be an object", 400);
  }

  // Build the complete form and merge supplied values.
  const values = buildEmptyForm();

  mergeFormValues(values, incomingValues);

  // Validate all supplied, non-empty values.
  const errors = validateCompleteForm(values);

  if (Object.keys(errors).length > 0) {
    throw new ServiceError("Validation failed", 400, errors);
  }

  const completed = hasAllRequiredFieldsInForm(values);

  // Create the main submission document.
  const submission = await Submission.create({
    userId,
    requestInfo: normalizeRequestInfo(requestInfo),
    values,
    status: completed ? "completed" : "draft",
  });

  // Create or update Table1A, Table11 and Table3A.
  const tables = await syncTables(submission);

  return {
    submission,
    completed,
    tables,
  };
};

/*
|--------------------------------------------------------------------------
| GET MY SUBMISSIONS
|--------------------------------------------------------------------------
*/

export const getMySubmissions = async (userId) => {
  validateUser(userId);

  return Submission.find({ userId }).sort({ createdAt: -1 }).lean();
};

/*
|--------------------------------------------------------------------------
| GET SUBMISSION BY ID
|--------------------------------------------------------------------------
*/

export const getSubmissionById = async (userId, id) => {
  validateUser(userId);

  if (!id) {
    throw new ServiceError("Submission ID is required", 400);
  }

  const submission = await Submission.findOne({
    _id: id,
    userId,
  }).lean();

  if (!submission) {
    throw new ServiceError("Submission not found", 404);
  }

  return submission;
};

/*
|--------------------------------------------------------------------------
| UPDATE EXISTING SUBMISSION
|--------------------------------------------------------------------------
*/

export const updateSubmission = async (userId, id, body = {}) => {
  validateUser(userId);

  if (!id) {
    throw new ServiceError("Submission ID is required", 400);
  }

  const submission = await Submission.findOne({
    _id: id,
    userId,
  });

  if (!submission) {
    throw new ServiceError("Submission not found", 404);
  }

  const incomingRequestInfo = body.requestInfo;
  const incomingValues = body.values;

  /*
   * STEP 1: Update request information if supplied.
   */
  if (incomingRequestInfo !== undefined) {
    validateRequestInfoOrThrow(incomingRequestInfo);

    submission.requestInfo = normalizeRequestInfo(incomingRequestInfo);
  }

  /*
   * STEP 2: Update vehicle form values if supplied.
   */
  if (incomingValues !== undefined) {
    if (
      !incomingValues ||
      typeof incomingValues !== "object" ||
      Array.isArray(incomingValues)
    ) {
      throw new ServiceError("Values must be an object", 400);
    }

    // Rebuild the complete form to discard unknown fields.
    const completeValues = buildEmptyForm();

    // Restore the current saved values first.
    mergeFormValues(
      completeValues,
      submission.values?.toObject
        ? submission.values.toObject()
        : submission.values || {},
    );

    // Apply the new values. Explicit empty strings clear fields.
    mergeFormValues(completeValues, incomingValues);

    const errors = validateCompleteForm(completeValues);

    if (Object.keys(errors).length > 0) {
      throw new ServiceError("Validation failed", 400, errors);
    }

    submission.values = completeValues;
  }

  /*
   * STEP 3: Determine draft/completed status.
   */
  const completed = hasAllRequiredFieldsInForm(
    submission.values?.toObject
      ? submission.values.toObject()
      : submission.values || {},
  );

  submission.status = completed ? "completed" : "draft";

  /*
   * STEP 4: Save the same submission.
   */
  await submission.save();

  /*
   * STEP 5: Sync the separate table collections.
   */
  const tables = await syncTables(submission);

  return {
    submission,
    completed,
    tables,
  };
};
