const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({path: "./config.env"});

const DB = process.env.DATABASE;
const options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(DB, options).then(() => {
  console.log("DB CONNECTED");
}).catch(err => {
  console.log("UNABLE to connect to DB ", err);
});