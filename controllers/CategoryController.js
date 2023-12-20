const { Category } = require("../models");

exports.addNewCategory = async (request, response) => {
  try {
    const { name } = request.body;
    const sanitizedCategoryName = name.trim();

    const newCategory = await Category.create({ name: sanitizedCategoryName });

    return response.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return response.status(500).json({
      success: false,
      message: "Oops! Something went wrong. Please try again later.",
    });
  }
};
