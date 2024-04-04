const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const auth = await Auth.findOne({ username: req.body.username });
  // verify username
  if (auth) {
    console.log("cannot create acc");
    res.status(400).json({ status: "error", msg: "username already exists" });
  }

  const hash = await bcrypt.hash(req.body.password, 12);

  await Auth.create({
    username: req.body.username,
    hash,
    role: req.body.role,
  });
  // hash compare
};

const login = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (!auth) {
      console.log("username not found");
      res.status(400).json({ status: "error", msg: "username not found" });
    }

    const compare = await bcrypt.compare(req.body.password, auth.hash);

    if (!compare) {
      console.log("wrong password!");
    }

    //create claims , access token , refresh token

    const claims = {
      username: auth.username,
      role: auth.role,
    };

    const access = await jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = await jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    ("WRONGG");
  }
};

const refresh = async (req, res) => {
  // check for refresh token
  const auth = await jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

  const claims = {
    username: auth.username,
    role: auth.role,
  };

  const access = await jwt.sign(claims, process.env.ACCESS_SECRET, {
    expiresIn: "20d",
    jwtid: uuidv4(),
  });
};
module.exports = { login };
