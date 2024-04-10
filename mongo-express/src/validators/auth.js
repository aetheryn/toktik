const { body } = require("express-validator");

const validateRegistration = [
  body("username", "username is required").not().isEmpty(),
  body(
    "username",
    "username should only contain letters or numbers"
  ).isAlphanumeric(),
  body("username", "username cannot be more that 16 characters long").isLength({
    max: 16,
  }),
  body("password", "password is required").not().isEmpty(),
  body("password", "password should be 8 to 16 characters long").isLength({
    min: 8,
    max: 16,
  }),
];

const validateLogin = [
  body("username", "username is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = { validateRegistration, validateLogin, validateRefreshToken };
