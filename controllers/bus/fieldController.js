import fields from "../../data/config/fields.json" with { type: "json" };

export const getFields = (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const data = fields
      .filter(
        (field) => field.subCategoryId === subCategoryId && field.isActive,
      )
      .sort((a, b) => a.displayOrder - b.displayOrder);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};