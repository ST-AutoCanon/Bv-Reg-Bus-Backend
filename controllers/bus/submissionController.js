import fields from "../../data/config/fields.json" with {
  type: "json",
};

import Submission from "../../mongoSchemas/bus/Submission.js";
import { validateValue } from "../../services/bus/validationService.js";
import { syncSubmissionTables } from "../../services/bus/tableSyncService.js";

/*
|--------------------------------------------------------------------------
| AUTHENTICATED USER HELPER
|--------------------------------------------------------------------------
| Keep existing middleware unchanged.
| It assigns the decoded JWT payload to req.user.
*/

const getAuthenticatedUserId = (req) => {
  const user = req.user;

  const userId =
    req.userId ??
    user?.userId ??
    user?._id ??
    user?.id ??
    user?.sub;

  if (userId === undefined || userId === null) {
    return null;
  }

  const normalizedId = String(userId).trim();

  return normalizedId || null;
};

/*
|--------------------------------------------------------------------------
| SAFE DIAGNOSTIC LOGGING
|--------------------------------------------------------------------------
*/

const logDatabaseInfo = () => {
  console.log("[Submission Debug] Database:", Submission.db?.name);
  console.log("[Submission Debug] Collection:", Submission.collection?.name);
  console.log(
    "[Submission Debug] userId schema type:",
    Submission.schema.path("userId")?.instance ?? "undefined"
  );
};

const logError = (label, error) => {
  console.error(`[Submission Error] ${label}`);

  console.error({
    name: error?.name,
    message: error?.message,
    code: error?.code,
    path: error?.path,
    kind: error?.kind,
  });

  if (error?.name === "ValidationError") {
    console.error(
      "[Submission Error] Validation details:",
      Object.fromEntries(
        Object.entries(error.errors || {}).map(([key, item]) => [
          key,
          {
            message: item.message,
            kind: item.kind,
            path: item.path,
          },
        ])
      )
    );
  }
};

const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "");

const requireAuthenticatedUser = (req, res) => {
  const userId = getAuthenticatedUserId(req);

  console.log("[Submission Debug] Authenticated user ID:", userId);

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return null;
  }

  return userId;
};

/*
|--------------------------------------------------------------------------
| REQUEST INFO VALIDATION
|--------------------------------------------------------------------------
*/

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
| BUILD EMPTY FORM
|--------------------------------------------------------------------------
*/

const buildEmptyForm = () => {
  const values = {};

  for (const field of fields) {
    if (!field.isActive) continue;

    const subCategoryId = field.subCategoryId;

    if (!values[subCategoryId]) {
      values[subCategoryId] = {};
    }

    values[subCategoryId][field.name] = "";
  }

  return values;
};

/*
|--------------------------------------------------------------------------
| MERGE FORM VALUES
|--------------------------------------------------------------------------
*/

const mergeFormValues = (target, incoming) => {
  if (!isPlainObject(incoming)) return;

  for (const field of fields) {
    if (!field.isActive) continue;

    const subCategoryId = field.subCategoryId;
    const fieldName = field.name;
    const incomingSubCategory = incoming[subCategoryId];

    if (!isPlainObject(incomingSubCategory)) continue;

    if (
      !Object.prototype.hasOwnProperty.call(
        incomingSubCategory,
        fieldName
      )
    ) {
      continue;
    }

    if (!target[subCategoryId]) {
      target[subCategoryId] = {};
    }

    target[subCategoryId][fieldName] =
      incomingSubCategory[fieldName];
  }
};

/*
|--------------------------------------------------------------------------
| VALIDATE FORM VALUES
|--------------------------------------------------------------------------
*/

const validateCompleteForm = (values) => {
  const errors = {};

  for (const field of fields) {
    if (!field.isActive) continue;

    const value =
      values?.[field.subCategoryId]?.[field.name];

    if (isEmptyValue(value)) continue;

    const fieldErrors = validateValue(field, value);

    if (fieldErrors?.length > 0) {
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
| CHECK REQUIRED FIELDS
|--------------------------------------------------------------------------
*/

const hasAllRequiredFieldsInForm = (values) => {
  for (const field of fields) {
    if (!field.isActive || !field.isRequired) continue;

    const value =
      values?.[field.subCategoryId]?.[field.name];

    if (isEmptyValue(value)) return false;
  }

  return true;
};

/*
|--------------------------------------------------------------------------
| TABLE RESPONSE HELPERS
|--------------------------------------------------------------------------
*/

const buildTableSummary = (tableResults = {}) => {
  const buildOne = (table) => ({
    completionPercentage: table?.completionPercentage ?? 0,
    status: table?.status ?? "not_started",
  });

  return {
    table1A: buildOne(tableResults.table1A),
    table11: buildOne(tableResults.table11),
    table3A: buildOne(tableResults.table3A),
  };
};

const buildTablesResponse = (tableResults = {}) => {
  const buildOne = (table) => ({
    id: table?._id ?? table?.id ?? null,
    completionPercentage: table?.completionPercentage ?? 0,
    status: table?.status ?? "not_started",
  });

  return {
    table1A: buildOne(tableResults.table1A),
    table11: buildOne(tableResults.table11),
    table3A: buildOne(tableResults.table3A),
  };
};

/*
|--------------------------------------------------------------------------
| CREATE SUBMISSION
|--------------------------------------------------------------------------
| POST /api/bus/submissions
*/

export const createSubmission = async (req, res) => {
  let createdSubmission;

  try {
    console.log("\n========== CREATE SUBMISSION ==========");

    const userId = requireAuthenticatedUser(req, res);
    if (!userId) return;

    logDatabaseInfo();

    const requestInfo = req.body?.requestInfo;

    if (!isPlainObject(requestInfo)) {
      console.warn("[Submission Debug] requestInfo missing or invalid");

      return res.status(400).json({
        success: false,
        message: "Request information is required",
      });
    }

    const requestInfoErrors = validateRequestInfo(requestInfo);

    if (Object.keys(requestInfoErrors).length > 0) {
      console.warn("[Submission Debug] requestInfo validation failed:", requestInfoErrors);

      return res.status(400).json({
        success: false,
        message: "Please complete all request information",
        errors: requestInfoErrors,
      });
    }

    const incomingValues = req.body?.values ?? {};

    if (!isPlainObject(incomingValues)) {
      return res.status(400).json({
        success: false,
        message: "Values must be an object",
      });
    }

    const values = buildEmptyForm();
    mergeFormValues(values, incomingValues);

    const errors = validateCompleteForm(values);

    if (Object.keys(errors).length > 0) {
      console.warn("[Submission Debug] Form validation failed");

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const completed = hasAllRequiredFieldsInForm(values);

    console.log("[Submission Debug] Creating document");
    console.log("[Submission Debug] Status:", completed ? "completed" : "draft");

    createdSubmission = await Submission.create({
      userId,
      requestInfo: {
        vehicleType: requestInfo.vehicleType,
        fuelType: requestInfo.fuelType,
        certificationType: requestInfo.certificationType,
        unloadedWeightWithoutBattery: requestInfo.unloadedWeightWithoutBattery,
        category: requestInfo.category,
        preferredTestingAgency: requestInfo.preferredTestingAgency,
      },
      values,
      status: completed ? "completed" : "draft",
    });

    console.log("[Submission Debug] Document created:", String(createdSubmission._id));
    console.log("[Submission Debug] Stored userId:", String(createdSubmission.userId));

    const tableResults = await syncSubmissionTables({
      submissionId: createdSubmission._id,
      userId,
      values: createdSubmission.values,
    });

    console.log("[Submission Debug] Table synchronization completed");

    if (createdSubmission.tables !== undefined) {
      createdSubmission.tables = buildTableSummary(tableResults);
      await createdSubmission.save();
    }

    return res.status(201).json({
      success: true,
      message: completed
        ? "Request submitted successfully"
        : "Request created as draft",
      data: createdSubmission,
      tables: buildTablesResponse(tableResults),
    });
  } catch (error) {
    logError("createSubmission failed", error);

    if (createdSubmission) {
      console.error(
        "[Submission Debug] Main document was created before the error:",
        String(createdSubmission._id)
      );
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create submission",
      ...(process.env.NODE_ENV !== "production" && {
        debug: error.message,
      }),
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET MY SUBMISSIONS
|--------------------------------------------------------------------------
| GET /api/bus/submissions
*/

export const getMySubmissions = async (req, res) => {
  try {
    console.log("\n========== GET MY SUBMISSIONS ==========");

    const userId = requireAuthenticatedUser(req, res);
    if (!userId) return;

    logDatabaseInfo();

    console.log("[Submission Debug] Counting all documents...");

    const totalDocuments = await Submission.countDocuments({});

    console.log("[Submission Debug] Total documents:", totalDocuments);

    console.log("[Submission Debug] Counting documents for user...");

    const matchingDocuments = await Submission.countDocuments({
      userId,
    });

    console.log(
      "[Submission Debug] Documents matching userId:",
      matchingDocuments
    );

    /*
     * If documents exist but none match, inspect a few stored
     * userId values without logging other users' identifiers.
     */
    if (totalDocuments > 0 && matchingDocuments === 0) {
      const samples = await Submission.find({})
        .select("userId")
        .limit(5)
        .lean();

      console.warn(
        "[Submission Debug] Sample stored userId types:",
        samples.map((doc) => ({
          type: typeof doc.userId,
          isNull: doc.userId == null,
          isObjectId:
            doc.userId?._bsontype === "ObjectId",
        }))
      );

      console.warn(
        "[Submission Debug] No submissions matched the authenticated user. Check the stored field name, userId value, schema type, and database/collection."
      );
    }

    const submissions = await Submission.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      "[Submission Debug] Submissions returned:",
      submissions.length
    );

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    logError("getMySubmissions failed", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      ...(process.env.NODE_ENV !== "production" && {
        debug: error.message,
      }),
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ONE SUBMISSION
|--------------------------------------------------------------------------
| GET /api/bus/submissions/:id
*/

export const getSubmissionById = async (req, res) => {
  try {
    console.log("\n========== GET SUBMISSION BY ID ==========");

    const userId = requireAuthenticatedUser(req, res);
    if (!userId) return;

    const { id } = req.params;

    console.log("[Submission Debug] Requested submission ID:", id);

    const submission = await Submission.findOne({
      _id: id,
      userId,
    }).lean();

    if (!submission) {
      console.warn("[Submission Debug] Submission not found for this user");

      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    logError("getSubmissionById failed", error);

    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch submission",
      ...(process.env.NODE_ENV !== "production" && {
        debug: error.message,
      }),
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE SUBMISSION
|--------------------------------------------------------------------------
| PATCH /api/bus/submissions/:id
*/

// export const updateSubmission = async (req, res) => {
//   try {
//     console.log("\n========== UPDATE SUBMISSION ==========");

//     const userId = requireAuthenticatedUser(req, res);
//     if (!userId) return;

//     const { id } = req.params;

//     console.log("[Submission Debug] Requested submission ID:", id);

//     const submission = await Submission.findOne({
//       _id: id,
//       userId,
//     });

//     if (!submission) {
//       console.warn("[Submission Debug] Submission not found for this user");

//       return res.status(404).json({
//         success: false,
//         message: "Submission not found",
//       });
//     }

//     const incomingRequestInfo = req.body?.requestInfo;
//     const incomingValues = req.body?.values;

//     if (incomingRequestInfo !== undefined) {
//       if (!isPlainObject(incomingRequestInfo)) {
//         return res.status(400).json({
//           success: false,
//           message: "Request information must be an object",
//         });
//       }

//       const requestInfoErrors =
//         validateRequestInfo(incomingRequestInfo);

//       if (Object.keys(requestInfoErrors).length > 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Please complete all request information",
//           errors: requestInfoErrors,
//         });
//       }

//       submission.requestInfo = {
//         vehicleType: incomingRequestInfo.vehicleType,
//         fuelType: incomingRequestInfo.fuelType,
//         certificationType: incomingRequestInfo.certificationType,
//         unloadedWeightWithoutBattery:
//           incomingRequestInfo.unloadedWeightWithoutBattery,
//         category: incomingRequestInfo.category,
//         preferredTestingAgency:
//           incomingRequestInfo.preferredTestingAgency,
//       };
//     }

//     if (incomingValues !== undefined) {
//       if (!isPlainObject(incomingValues)) {
//         return res.status(400).json({
//           success: false,
//           message: "Values must be an object",
//         });
//       }

//       const completeExistingValues = buildEmptyForm();

//       mergeFormValues(
//         completeExistingValues,
//         submission.values || {}
//       );

//       mergeFormValues(
//         completeExistingValues,
//         incomingValues
//       );

//       const errors = validateCompleteForm(completeExistingValues);

//       if (Object.keys(errors).length > 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Validation failed",
//           errors,
//         });
//       }

//       submission.values = completeExistingValues;
//     }

//     const completed = hasAllRequiredFieldsInForm(
//       submission.values || {}
//     );

//     submission.status = completed ? "completed" : "draft";

//     await submission.save();

//     console.log(
//       "[Submission Debug] Main submission saved:",
//       String(submission._id)
//     );

//     const tableResults = await syncSubmissionTables({
//       submissionId: submission._id,
//       userId,
//       values: submission.values,
//     });

//     console.log("[Submission Debug] Table synchronization completed");

//     if (submission.tables !== undefined) {
//       submission.tables = buildTableSummary(tableResults);
//       await submission.save();
//     }

//     return res.status(200).json({
//       success: true,
//       message: completed
//         ? "Request completed successfully"
//         : "Request saved as draft",
//       data: submission,
//       tables: buildTablesResponse(tableResults),
//     });
//   } catch (error) {
//     logError("updateSubmission failed", error);

//     if (error?.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid submission ID",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update submission",
//       ...(process.env.NODE_ENV !== "production" && {
//         debug: error.message,
//       }),
//     });
//   }
// };



// Helper: Return only fields whose values changed
const getChangedFields = (incoming, existing) => {
  const changed = {};

  for (const key of Object.keys(incoming || {})) {
    const newValue = incoming[key];
    const oldValue = existing?.[key];

    if (
      newValue !== null &&
      typeof newValue === "object" &&
      !Array.isArray(newValue)
    ) {
      const nestedChanges = getChangedFields(
        newValue,
        oldValue &&
          typeof oldValue === "object" &&
          !Array.isArray(oldValue)
          ? oldValue
          : {}
      );

      if (Object.keys(nestedChanges).length > 0) {
        changed[key] = nestedChanges;
      }
    } else if (
      JSON.stringify(newValue) !== JSON.stringify(oldValue)
    ) {
      changed[key] = newValue;
    }
  }

  return changed;
};

export const updateSubmission = async (req, res) => {
  try {
    console.log("\n========== UPDATE SUBMISSION ==========");

    const userId = requireAuthenticatedUser(req, res);
    if (!userId) return;

    const { id } = req.params;

    console.log("[Submission Debug] Requested submission ID:", id);

    const submission = await Submission.findOne({
      _id: id,
      userId,
    });

    if (!submission) {
      console.warn(
        "[Submission Debug] Submission not found for this user"
      );

      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    const incomingRequestInfo = req.body?.requestInfo;
    const incomingValues = req.body?.values;

    // Capture only changed fields BEFORE updating the submission.
    let changedValues;

    if (incomingValues !== undefined) {
      if (!isPlainObject(incomingValues)) {
        return res.status(400).json({
          success: false,
          message: "Values must be an object",
        });
      }

      const existingValues = submission.values?.toObject
        ? submission.values.toObject()
        : submission.values || {};

      changedValues = getChangedFields(
        incomingValues,
        existingValues
      );
    }

    // Update request information if provided.
    if (incomingRequestInfo !== undefined) {
      if (!isPlainObject(incomingRequestInfo)) {
        return res.status(400).json({
          success: false,
          message: "Request information must be an object",
        });
      }

      const requestInfoErrors =
        validateRequestInfo(incomingRequestInfo);

      if (Object.keys(requestInfoErrors).length > 0) {
        return res.status(400).json({
          success: false,
          message: "Please complete all request information",
          errors: requestInfoErrors,
        });
      }

      submission.requestInfo = {
        vehicleType: incomingRequestInfo.vehicleType,
        fuelType: incomingRequestInfo.fuelType,
        certificationType:
          incomingRequestInfo.certificationType,
        unloadedWeightWithoutBattery:
          incomingRequestInfo.unloadedWeightWithoutBattery,
        category: incomingRequestInfo.category,
        preferredTestingAgency:
          incomingRequestInfo.preferredTestingAgency,
      };
    }

    // Merge incoming values with existing values.
    if (incomingValues !== undefined) {
      const completeExistingValues = buildEmptyForm();

      mergeFormValues(
        completeExistingValues,
        submission.values || {}
      );

      mergeFormValues(
        completeExistingValues,
        incomingValues
      );

      // Validate the complete merged form.
      const errors = validateCompleteForm(
        completeExistingValues
      );

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      // Save the full form, not just changed fields.
      submission.values = completeExistingValues;
    }

    // Update submission status.
    const completed = hasAllRequiredFieldsInForm(
      submission.values || {}
    );

    submission.status = completed ? "completed" : "draft";

    await submission.save();

    console.log(
      "[Submission Debug] Main submission saved:",
      String(submission._id)
    );

    // Synchronize related tables using the complete saved form.
    const tableResults = await syncSubmissionTables({
      submissionId: submission._id,
      userId,
      values: submission.values,
    });

    console.log(
      "[Submission Debug] Table synchronization completed"
    );

    if (submission.tables !== undefined) {
      submission.tables = buildTableSummary(tableResults);
      await submission.save();
    }

    // Return only changed values in the response.
    return res.status(200).json({
      success: true,
      message: completed
        ? "Request completed successfully"
        : "Request saved as draft",
      data: {
        _id: submission._id,
        ...(changedValues !== undefined && {
          values: changedValues,
        }),
        updatedAt: submission.updatedAt,
      },
    });
  } catch (error) {
    logError("updateSubmission failed", error);

    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update submission",
      ...(process.env.NODE_ENV !== "production" && {
        debug: error.message,
      }),
    });
  }
};