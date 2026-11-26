const T2 = require("../../../mongoSchemas/bus/T2.js").default;

const getTable2BySubmission = async ({ submissionId, userId }) => {
  const table2 = await T2.findOne({
    submissionId,
    userId,
  }).lean();

  if (!table2) {
    return null;
  }

  return {
    tableId: "T2",
    submissionId: table2.submissionId,
    completionPercentage: table2.completionPercentage,
    status: table2.status,
    data: table2.data || {},
    createdAt: table2.createdAt,
    updatedAt: table2.updatedAt,
  };
};

module.exports = {
  getTable2BySubmission,
};
