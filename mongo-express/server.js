require("dotenv").config();

const express = require("express");
const auth = require("./src/routers/auth");
const video = require("./src/routers/Videos");
const messages = require("./src/routers/messages");
const userProfile = require("./src/routers/userProfile");
const comments = require("./src/routers/comments");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");
const { app, server } = require("./src/socket/socket");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000000,
  standardHeaders: true,
  legacyHeaders: false,
});

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
app.use("/comments", comments);

const PORT = process.env.PORT || 6001;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
