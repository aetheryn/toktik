const UserProfile = require("../models/auth");

// get ALL userprofile SO FAR ITS ONLY USERNAMe - need to see what we need to fetch from this for all users

const getAllUserProfile = async (req, res) => {
  try {
    const profiles = await UserProfile.find().select("username");
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
    });
  } catch (error) {
    console.log("Error getting specificed user");
    res
      .status(400)
      .json({ status: "error", msg: "Error fetching specific user profile" });
  }
};

// put UserProfile ( add data in ) (Add data in specific thing - when called from front-end it will findByIdAndUpdate)

// patch UserProfile ( update data ) (Is there a need to edit? Don't really need to right because most of the actions are single actions - not mass updating)

// delete UserProfile ( delete specific things in user profile -- unlike videos / remove following etc )

module.exports = { getAllUserProfile, getProfileById };
