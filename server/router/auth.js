const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("hello from router");
});
//using promises
// router.post("/register", async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     work,
//     password,
//     cpassword
//   } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({error: "filled the field property"});
//   }
//   User.findOne({email: email}).then(userExist => {
//     if (userExist) {
//       return res.status(422).json({error: "Email already exist"});
//     }
//     const user = new User({
//       name,
//       email,
//       phone,
//       work,
//       password,
//       cpassword
//     });
//     user.save().then(() => {
//       res.status(201).json({message: "user register successfully "});
//     }).catch(err => {
//       res.status(500).json({message: "failed to registered"});
//     });
//   }).catch(err => {
//     console.log(err);
//   });
//   console.log(req.body.work);
//      res.send("register page");
//   res.json({message: req.body});
// });
//using async /await
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone,
    work,
    password,
    cpassword
  } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({error: "filled the field property"});
  }
  try {
    const userExist = await User.findOne({email: email});
    if (userExist) {
      return res.status(422).json({error: "Email already exist"});
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword
    });
    await user.save();
    res.status(201).json({message: "user register successfully "});
  } catch (error) {
    console.log(error);
  }

  //console.log(req.body.work);
  //   res.send("register page");
  //res.json({message: req.body});
});
module.exports = router;
