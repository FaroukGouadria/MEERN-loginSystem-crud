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
//signUp
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
    } else if (password !== cpassword) {
      return res.status(422).json({error: "password are not matching"});
    } else {
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
    }
  } catch (error) {
    console.log(error);
  }

  //console.log(req.body.work);
  //   res.send("register page");
  //res.json({message: req.body});
});
//signIn

router.post("/login", async (req, res) => {
  //   console.log(req.body);
  //   res.json({message: "login welcome"});
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({error: "filled the data"});
    }
    const userLogin = await User.findOne({email: email});
    console.log(userLogin);
    if (!userLogin) {
      res.status(400).json({error: "error something wrong"});
    }
    res.status(200).json({message: "user logged successfully"});
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
