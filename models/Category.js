const mongoose = require("mongoose");

const CustomCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique: true, minlength: 1, required: true },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const CustomCategoryModel = mongoose.model(
  "CustomCategory",
  CustomCategorySchema
);

module.exports = { CustomCategoryModel, CustomCategorySchema };
