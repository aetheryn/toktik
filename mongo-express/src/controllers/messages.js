const Messages = require("../models/Messages");

const seedMessages = async (req, res) => {
  try {
    await Messages.deleteMany({});
    await Messages.create([
      {
        receiver_id: "Ken",
        sender_id: "Bryan",
        content: "omg",
      },
      {
        receiver_id: "Gab",
        sender_id: "Ken",
        content: "sis",
      },
      {
        receiver_id: "Bryan",
        sender_id: "Gab",
        content: "hello",
      },
    ]);
    return res
      .status(200)
      .json({ status: "ok", msg: "Seeding messages successful." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Seeding messages failed." });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userMessages = await Messages.find().or([
      { receiver_id: req.params.user },
      { sender_id: req.params.user },
    ]);

    return res.status(200).json(userMessages);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting messages of ${req.params.user}.`,
    });
  }
};

module.exports = { seedMessages, getUserMessages };
