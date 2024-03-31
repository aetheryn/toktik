const Auth = require("../models/auth");

// seed logins

// hash not included yet as yet to generate
const seedUsers = async (req, res) => {
  try {
    await Auth.deleteMany({});

    await Auth.create(
      {
        _id: "6601a375649b3e647be94080",
        username: "usertest",
        hash: "",
      },
      {
        _id: "6605408f6e7d8b971e6c2c63",
        username: "admintest",
        hash: "",
      }
    );
    res.json({ status: "ok", msg: "users successfully seeded" });
  } catch (error) {
    console.log("Error creating user");
    res.status(400).json({ status: "error", msg: "failed to create user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersList = await Auth.find();

    res.json(usersList);
  } catch (error) {
    console.log("Error getting all users");
    res.status(400).json({ status: "error", msg: "Error getting all users" });
  }
};

const register = async (req, res) => {
  try {
    const auth = Auth.findOne({ username: req.body.username });
    if (auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "username already exists" });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await Auth.create({
      username: req.body.username,
      hash,
      role: req.body.role || "user",
    });

    res.json({ status: "ok", msg: "Account created successfully!" });
  } catch (error) {
    console.log("Something went wrong!");
    res.status(400).json({ status: "error", msg: "Error creating account!" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (!auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username does not exist!" });
    }

    const passwordVerification = await bcrypt.compare(
      req.body.password,
      auth.hash
    );

    if (!passwordVerification) {
      console.log("You have entered the wrong password!");
      return res.status(400).json({ status: "error", msg: "Wrong password" });
    }

    const claims = {
      email: auth.email,
      role: auth.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.log("An error has occured!");
    res.status(400).json({ status: "error", msg: "Login failed!" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.log("Error refreshing key");
    res.status(400).json({ status: "error", msg: "Refresh failed" });
  }
};
module.exports = { getAllUsers, register, login, refresh };