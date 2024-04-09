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

const bucketNameBackup = process.env.BUCKET_NAME_BACKUP;
const accessKeyBackup = process.env.ACCESS_KEY_BACKUP;
const secretAccessKeyBackup = process.env.SECRET_ACCESS_KEY_BACKUP;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyBackup,
    secretAccessKey: secretAccessKeyBackup,
  },
  region: bucketRegion,
});

const seedVideo = async (req, res) => {
  try {
    await Videos.deleteMany({});

    await Videos.create([
      {
        title: "This CAT",
        url: "https://via.placeholder.com/150",
        reported: false,
        likes: ["user1", "user2", "user3"], // Array of strings
        comments: [
          {
            username: "user1",
            content: "this video sucks boo",
            created_at: 2025 - 11 - 11,
          },
        ],

        created_at: 2025 - 11 - 12,
        username: "user11",
        fileName: "mongoose",
      },
      {
        title: "This DOG",
        url: "https://via.placeholder.com/150",
        reported: true,
        likes: ["user1", "user2", "user3", "user4"], // Array of strings
        comments: [
          {
            username: "user1",
            content: "this video sucks boo",
            created_at: 2025 - 11 - 11,
          },
          {
            username: "user2",
            content: "i agree this video is bad boo",
            created_at: 2025 - 11 - 11,
          },
        ],
        created_at: 2025 - 11 - 12,
        username: "user69",
        fileName: "yes",
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
      console.log(video.fileName);
      const getObjectParams = { Bucket: bucketNameBackup, Key: video.fileName };
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

const getVideoByUser = async (req, res) => {
  try {
    const videos = await Videos.find({ username: req.params.username });

    for (const video of videos) {
      const getObjectParams = { Bucket: bucketNameBackup, Key: video.fileName };
      const command = new GetObjectCommand(getObjectParams);

      const url = await getSignedUrl(s3, command, { expireIn: 3600 });
      video.url = url;
      await Videos.updateOne({ _id: video._id }, { url: video.url });
    }

    res.json(videos);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Can't fetch videos for user" });
  }
};

const getSelectVideo = async (req, res) => {
  try {
    const videos = await Videos.findOne({ _id: req.body.id });
    res.json(videos);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Can't fetch videos for user" });
  }
};

const addVideos = async (req, res) => {
  try {
    const newVideo = {
      title: req.body.title,
      fileName: req.body.fileName,
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
    const video = await Videos.find({ username: req.body.username });
    res.json(video);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to get video" });
  }
};

const uploadFile = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    req.file.buffer;

    const fileName = req.file.originalname;
    const params = {
      Bucket: bucketNameBackup,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const upload = {
      title: req.body.title,
      fileName: fileName,
      url: "",
      username: req.body.username,
    };
    await Videos.create(upload);

    res.json(upload);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to upload video" });
  }
};

const getFlaggedVideos = async (req, res) => {
  try {
    const flaggedVideo = await Videos.find({ reported: true });
    res.json(flaggedVideo);
    // this works
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "can't find flagged videos" });
  }
};

// patch
const updateFlaggedVideo = async (req, res) => {
  try {
    const updatedVideoStatus = {};
    if ("reported" in req.body) updatedVideoStatus.reported = req.body.reported;
    await Videos.findByIdAndUpdate(req.params.id, updatedVideoStatus);
    console.log(updatedVideoStatus);
    res.json({ status: "ok", msg: "video reported status changed" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "can't updated flagged video" });
  }
};

const addComments = async (req, res) => {
  try {
    await Videos.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { comments: req.body } }
    );

    console.log(req.body.replies.parentId);

    res.status(200).json({ status: "ok", msg: "added comments" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error adding comments weh weh" });
  }
};

const findParent = (commentsobj, parentId) => {
  // while loop to loop through everything in the comments
  let commentsTotal = [...commentsobj]; // to create a shallow copy of the comments -

  while (commentsTotal.length > 0) {
    //if there are things in comments --> push to comment variable (creating the nesting thingy)
    const comment = commentsTotal.shift();
    // console.log(comment._id); comes out as objectId

    if (comment._id.toString() === parentId) {
      //toString() is to only get the value of the ObjectID
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      //after comment is iterated - look into comment.replies (if have push into commentsTotal)
      commentsTotal = [...commentsTotal, ...comment.replies];
    }
  }

  console.log("error orphan");
};

const addReplies = async (req, res) => {
  try {
    const check = await Videos.findById({
      _id: req.params.id, // req.params.id finds the specific video to update the comments - videoSchema
    });

    const comments = check.comments; // only displays the comments subdoc in the video document

    const parent = findParent(comments, req.body.parentId);

    console.log(parent.replies);

    const addReply = {
      username: req.body.username,
      content: req.body.content,
      profilePicture: req.body.profilePicture,
      parentId: req.body.parentId,
      replies: [],
    };

    parent.replies.push(addReply);

    await check.save();

    res.status(200).json({ status: "ok", msg: "added new reply! :) " });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error finding comment cuz RECUSIVE" });
  }
};

const addLikes = async (req, res) => {
  try {
    await Videos.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { likes: req.body.username } }
    );
    res.status(200).json({ status: "ok", msg: "user added to likes" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error adding user to likes" });
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
  getVideoByUser,
  addComments,
  getFlaggedVideos,
  updateFlaggedVideo,
  getSelectVideo,
  addReplies,
  addLikes,
};
