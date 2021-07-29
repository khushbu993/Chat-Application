// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUsersValidator,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");

const router = express.Router();

// Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add User
router.post(
  "/",
  avatarUpload,
  addUsersValidator,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
