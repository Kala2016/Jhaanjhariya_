const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fname: {
    required: true,
    type: String,
  },
  lname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  mobile: {
    required: true,
    type: Number,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  is_Blocked: {
    type: Boolean,
    default: false,  
  },
  
});

const userCollection = mongoose.model("userCollection", userSchema);
module.exports = userCollection;
