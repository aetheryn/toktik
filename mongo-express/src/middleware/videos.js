const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSingleVideo = () => {
  upload.single("image");
  next();
};

module.exports = { uploadSingleVideo };
