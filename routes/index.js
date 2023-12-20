const express = require("express");
const mainRouter = express.Router();
const customCategoryRouter = require("./CustomCategoryRouter");
const customUserRouter = require("./CustomUserRouter");
const postManagementRouter = require("./PostManagementRouter");

mainRouter.use("/custom-category", customCategoryRouter);
mainRouter.use("/custom-user", customUserRouter);
mainRouter.use("/post-management", postManagementRouter);

module.exports = mainRouter;
