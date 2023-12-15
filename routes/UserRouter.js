const router = require("express").Router();
const UserController = require("../controllers/UserController");
const validateRegister = require("../middleware/validateRegister");

router.post("/login", UserController.login);
router.post("/registration", [validateRegister], UserController.registration);

module.exports = router;