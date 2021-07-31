// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUsersValidator,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");

const router = express.Router();

// Users page
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

// add User
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUsersValidator,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

module.exports = router;
