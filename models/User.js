const mongoose = require("mongoose");

const CustomUserSchema = new mongoose.Schema(
  {
    fullName: { type: String, minlength: 1, required: true },
    emailAddress: { type: String, required: true, minlength: 5, unique: true },
    passwordHash: { type: String, required: true, minlength: 8 },
    lastLoginTimestamp: { type: Number, required: true, default: 0 },
  },
  { versionKey: false }
);

const CustomUserModel = mongoose.model("CustomUser", CustomUserSchema);

module.exports = { CustomUserModel, CustomUserSchema };
