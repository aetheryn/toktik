require("dotenv").config();
import { S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const express = require("express");
const auth = require("./src/routers/auth");
const video = require("./src/routers/videos");
const messages = require("./src/routers/messages");
const userProfile = require("./src/routers/userProfile");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
connectDB();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/videos", video);
app.use("/messages", messages);
app.use("/users", userProfile);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
