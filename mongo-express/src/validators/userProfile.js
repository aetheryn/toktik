const { body } = require("express-validator");

const checkFollowInput = [
  body("following", "following cannot be Empty").not().isEmpty(),
  body("followers", "followers cannot be Empty").not().isEmpty(),
];

module.exports = { checkFollowInput };
