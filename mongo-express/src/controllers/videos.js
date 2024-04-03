const { Videos } = require("../models/Videos");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const seedVideo = async (req, res) => {
  try {
    await Videos.deleteMany({});

    await Videos.create([
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
        uploaded_by_user: "user11",
        imageName: "ahhhhh",
        caption: "potato",
      },
      {
        title: "This DOG",
        description: "i LOVE my dog",
        duration: 300, // Number indicated in seconds
        url: "https://via.placeholder.com/150",
        reported: true,
        likes: ["user1", "user2", "user3", "user4"], // Array of strings
        comments: [
          {
            id: 1,
            username: "user1",
            content: "this video sucks boo",
            created_at: 2025 - 11 - 11,
          },
          {
            id: 2,
            username: "user2",
            content: "i agree this video is bad boo",
            created_at: 2025 - 11 - 11,
          },
        ],
        id: 2,
        created_at: 2025 - 11 - 12,
        uploaded_by_user: "user69",
        imageName: "yes",
        caption: "nani",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(200).json({ status: "error", msg: "seeding failed" });
  }
};

const getVideos = async (req, res) => {
  try {
    const allVideos = await Videos.find();
    for (const video of allVideos) {
      const getObjectParams = { Bucket: bucketName, Key: video.imageName };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      video.url = url;
      await Videos.updateOne({ _id: video._id }, { url: video.url });
    }
    res.json(allVideos);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "can't get videos" });
  }
};

const addVideos = async (req, res) => {
  try {
    const newVideo = {
      id: req.body.id,
      created_at: req.body.created_at,
      uploaded_by_user: req.body.uploaded_by_user,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      url: req.body.url,
      reported: req.body.reported,
      likes: req.body.likes,
      comments: [req.body.comments],
    };
    await Videos.create(newVideo);
    res.json({ status: "ok", msg: "video added" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to add video" });
  }
};

const updateVideo = async (req, res) => {
  try {
    const updatedVideo = {};
    if ("title" in req.body) updatedVideo.title = req.body.title;
    if ("description" in req.body)
      updatedVideo.description = req.body.description;
    await Videos.findByIdAndUpdate(req.params.id, updatedVideo);
    res.json({ status: "ok", msg: "video updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to update video" });
  }
};

const deleteVideo = async (req, res) => {
  try {
    await Videos.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "video deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to delete video" });
  }
};

const getSpecificVideo = async (req, res) => {
  try {
    const video = await Videos.findById(req.body.id);
    res.json(video);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to get video" });
  }
};

const uploadFile = async (req, res) => {
  try {
    // const file = req.file;
    // const caption = req.body.caption;
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    req.file.buffer;

    const imageName = req.file.originalname;
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const upload = {
      // tentative hard coded stuff to test
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      url: "",
      reported: false,
      likes: req.body.likes,
      comments: req.body.comments,
      id: req.body.id,
      created_at: req.body.created_at,
      uploaded_by_user: req.body.uploaded_by_user,
      imageName: imageName,
      caption: req.body.caption,
    };
    await Videos.create(upload);

    res.json(upload);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to upload video" });
  }
};

module.exports = {
  seedVideo,
  getVideos,
  addVideos,
  updateVideo,
  deleteVideo,
  getSpecificVideo,
  uploadFile,
};
