import subCategories from "../../data/config/subcategories.json" with { type: "json" };

export const getSubCategories = (req, res) => {
  try {
    const { categoryId } = req.params;

    const data = subCategories
      .filter((item) => item.categoryId === categoryId && item.isActive)
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