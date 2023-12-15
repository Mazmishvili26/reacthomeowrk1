const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const createCategoryMiddleware = require("../middleware/createCategory");

router
  .route("/")
  .get()
  .post([createCategoryMiddleware], CategoryController.createCategory);

module.exports = router;

//.../category/
