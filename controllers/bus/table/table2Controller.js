const mongoose = require("mongoose");

const {
  getTable2BySubmission,
} = require("../../../services/bus/table/table2Service");

const getAuthenticatedUserId = (req) => {
  const user = req.user;

  if (!user) return null;

  const userId =
    user.userId ||
    user._id ||
    user.id ||
    user.sub ||
    user.user?.userId ||
    user.user?._id ||
    user.user?.id;

  return userId ? String(userId) : null;
};

exports.getTable2 = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (
      !mongoose.isValidObjectId(submissionId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID or user ID.",
      });
    }

    const table2 = await getTable2BySubmission({
      submissionId: new mongoose.Types.ObjectId(submissionId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!table2) {
      return res.status(404).json({
        success: false,
        message: "Table 2 data not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Table 2 data fetched successfully.",
      data: table2,
    });
  } catch (error) {
    console.error("Error fetching Table 2:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Table 2 data.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
