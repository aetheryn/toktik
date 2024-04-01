const VideosModel = require("../models/Videos");

const seedVideo = async (req, res) => {
  try {
    await VideosModel.deleteMany({});

    await VideosModel.create([
      {
        title: "This CAT",
        description: "i love my cat",
        duration: 150, // Number indicated in seconds
        url: "https://via.placeholder.com/150",
        reported: false,
        likes: ["user1", "user2", "user3"], // Array of strings
        comments: [
          {
            id: 1,
            username: "user1",
            content: "this video sucks boo",
            created_at: 2025 - 11 - 11,
          },
        ],
        id: 1,
        created_at: 2025 - 11 - 12,
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(200).json({ status: "error", msg: "seeding failed" });
  }
};

module.exports = { seedVideo };
