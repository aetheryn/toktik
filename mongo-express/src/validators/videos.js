const { body, param } = require("express-validator");

const validateIdInParam = [
  param("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

const validateIdInBody = [
  body("id", "id is required").not().isEmpty(),
  body("id", "id is invalid").isLength({ min: 24, max: 24 }),
];

const validateAddVideoData = [
  body("title", "title is required").optional().not().isEmpty(),
  body("title", "title must have at least 1 - 30 characters")
    .optional()
    .isLength({
      min: 1,
      max: 30,
    }),
  body("description", "description is required").optional().not().isEmpty(),
  body("description", "description must have at least 1 character")
    .optional()
    .isLength({
      min: 1,
    }),
  body("duration", "duration is required").optional().not().isEmpty(),
  body("duration", "duration must be at least 1 second long")
    .optional()
    .isInt({ min: 1 }),
  body("url", "url is required").optional().not().isEmpty(),
  body("url", "url must be valid").optional().isURL(),
  body("uploaded_by_user", "uploaded_by_user is required")
    .optional()
    .not()
    .isEmpty(),
  body("uploaded_by_user", "uploaded_by_user must be valid")
    .optional()
    .isLength({
      min: 1,
      max: 16,
    }),
];

const validateUpdateVideoData = [
  body("title", "title is required").optional().not().isEmpty(),
  body("title", "title must have at least 1 - 30 characters")
    .optional()
    .isLength({
      min: 1,
      max: 30,
    }),
  body("description", "description is required").optional().not().isEmpty(),
  body("description", "description must have at least 1 character")
    .optional()
    .isLength({
      min: 1,
    }),
  body("duration", "duration is required").optional().not().isEmpty(),
  body("duration", "duration must be at least 1 second long")
    .optional()
    .isInt({ min: 1 }),
  body("url", "url is required").optional().not().isEmpty(),
  body("url", "url must be valid").optional().isURL(),
  body("uploaded_by_user", "uploaded_by_user is required")
    .optional()
    .not()
    .isEmpty(),
  body("uploaded_by_user", "uploaded_by_user must be valid")
    .optional()
    .isLength({
      min: 1,
      max: 16,
    }),
];

module.exports = {
  validateIdInBody,
  validateIdInParam,
  validateAddVideoData,
  validateUpdateVideoData,
};
