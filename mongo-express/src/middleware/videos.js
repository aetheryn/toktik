const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSingleFile = (req, res, next) => {
  upload.single("fileName")(req, res, next);
};

module.exports = { uploadSingleFile };
