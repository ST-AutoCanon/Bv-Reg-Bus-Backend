import categories from "../../data/config/categories.json" with { type: "json" };

export const getCategories = (req, res) => {
  try {
    const data = categories
      .filter((category) => category.isActive)
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
