

const T3 = require("../../../mongoSchemas/bus/T3.js").default;

const getTable3BySubmission = async ({ submissionId, userId }) => {
  const table3 = await T3.findOne({
    submissionId,
    userId,
  }).lean();

  if (!table3) {
    return null;
  }

  return {
    tableId: "T3",
    submissionId: table3.submissionId,
    completionPercentage: table3.completionPercentage,
    status: table3.status,
    data: table3.data || {},
    createdAt: table3.createdAt,
    updatedAt: table3.updatedAt,
  };
};

module.exports = {
  getTable3BySubmission,
};