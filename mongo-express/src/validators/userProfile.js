const { body } = require("express-validator");

const checkFollowInput = [
  body("username", "Username cannot be Empty").not().isEmpty(),
];

module.exports = { checkFollowInput };
