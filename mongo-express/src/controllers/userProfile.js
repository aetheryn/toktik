const UserProfile = require("../models/auth");

// get ALL userprofile SO FAR ITS ONLY USERNAMe - need to see what we need to fetch from this for all users

const getAllUserProfile = async (req, res) => {
  try {
    const profiles = await UserProfile.find().select(
      "username following followers liked_videos profilePicture role"
    );
    res.json(profiles);
  } catch (error) {
    console.log("Error getting all profile names");
    res
      .status(400)
      .json({ status: "error", msg: "Error fetching user profiles" });
  }
};

// get UserProfile by ID (method: POST? ) // pass it through params
const getProfileById = async (req, res) => {
  try {
    const profileID = await UserProfile.findOne({
      username: req.params.username,
    }).select("profilePicture followers following liked_videos description");

    res.json(profileID);
  } catch (error) {
    console.log("Error getting specific user");
    res
      .status(400)
      .json({ status: "error", msg: "Error fetching specific user profile" });
  }
};

// put UserProfile ( add data in ) (Add data in specific thing - when called from front-end it will findByIdAndUpdate)
// will need to add data in both current user + target user - - either updateMany or have another function when update to add data
const addProfileData = async (req, res) => {
  try {
    const tempArr = {};
    // Need to check for validation if there's any udpate to the specific field
    if ("following" in req.body) tempArr.following = req.body.following;
    if ("followers" in req.body) tempArr.followers = req.body.followers;
    if ("liked_videos" in req.body)
      tempArr.liked_videos = req.body.liked_videos;
    if ("profilePicture" in req.body)
      tempArr.profilePicture = req.body.profilePicture;
    if ("description" in req.body) tempArr.description = req.body.description;

    await UserProfile.findOneAndUpdate(
      { username: req.params.username },
      { $push: tempArr }
    );

    res.json({ status: "ok", msg: "Added data :) " });

    // if put the same data
  } catch (error) {
    console.log("Error adding data");
    res.status(400).json({ status: "error", msg: "Error adding data" });
  }
};

const removeProfileData = async (req, res) => {
  try {
    const tempArr = {};
    // Need to check for validation if there's any udpate to the specific field
    if ("following" in req.body) tempArr.following = req.body.following;
    if ("followers" in req.body) tempArr.followers = req.body.followers;
    if ("liked_videos" in req.body)
      tempArr.liked_videos = req.body.liked_videos;

    await UserProfile.findOneAndUpdate(
      { username: req.params.username },
      { $pull: tempArr }
    );

    console.log(req.body);
    res.json({ status: "ok", msg: "Added data :) " });

    // if put the same data
  } catch (error) {
    console.log("Error adding data");
    res.status(400).json({ status: "error", msg: "Error adding data" });
  }
};

const updateDescription = async (req, res) => {
  try {
    await UserProfile.findOneAndUpdate(
      { username: req.params.username },
      { description: req.body.description }
    );

    res.json({ status: "ok", msg: "Added description :) " });

    // if put the same data
  } catch (error) {
    console.log("Error adding data");
    res.status(400).json({ status: "error", msg: "Error adding description" });
  }
};

// patch UserProfile ( update data ) (Is there a need to edit? Don't really need to right because most of the actions are single actions - not mass updating)

// delete UserProfile ( delete specific things in user profile -- unlike videos / remove following etc )

module.exports = {
  getAllUserProfile,
  getProfileById,
  addProfileData,
  removeProfileData,
  updateDescription,
};
