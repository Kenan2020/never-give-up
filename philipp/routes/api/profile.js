const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");
const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First Name is required").not().isEmpty(),
      check("lastName", "Last Name is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
      check("gender", "gender is required").not().isEmpty(),
      check("hobbyes", "hobbyes is required").not().isEmpty(),
      check("countryOfOrgigin", "countryOfOrgigin is required").not().isEmpty(),
      check("educationBackground", "educationBackground is required")
        .not()
        .isEmpty(),
      check("birthDate", "From date is required and needs to be from the past")
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstName,
      lastName,
      skills,
      birthDate,
      gender,
      countryOfOrgigin,
      residentCity,
      educationBackground,
      hobbyes,
      email,
    } = req.body;

    const profileFields = {
      firstName,
      lastName,
      user: req.user.id,
      skills,
      birthDate,
      gender,
      countryOfOrgigin,
      residentCity,
      educationBackground,
      hobbyes,
      email,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update USer Profile

// router.post('/update', auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const {
//     email,
//     password

//   } = req.body;

//   const updateprofileFields = {
//     email,
//     password
//   };

//   let userID = req.user.id;
//   //let userID = req.body.id;
//   try {
//     // Using upsert option (creates new doc if no match is found):
//     let user = await User.findByIdAndUpdate(
//       userID,
//       { $set: updateprofileFields },
//       { new: true, upsert: true }
//     );
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
//   console.log(err);

// }
// );

module.exports = router;
