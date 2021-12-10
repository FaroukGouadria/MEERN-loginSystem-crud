const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number
  },
  work: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  }
});

// hash mot de passe
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
    this.cpassword = bcrypt.hashSync(this.cpassword, salt);
  }
  next();
});
// userSchema.pre("save", async function (next) {
//   if (this.isModified("cpassword")) {
//     this.cpassword = bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });
// userSchema.pre("save", function (next) {
//   var user = this;
//   if (!user.isModified("password"))
//     return callback();
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err)
//       return next(err);
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err)
//         return next(err);
//       user.password = hash;
//       next();
//     });
//   });

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err)
//       return next(err);
//     bcrypt.hash(user.cpassword, salt, function (err, hash) {
//       if (err)
//         return next(err);
//       user.cpassword = hash;
//       next();
//     });
//   });
// });

const User = mongoose.model("USER", userSchema);

module.exports = User;