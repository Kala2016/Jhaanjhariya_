const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  status:{
    type:String,
  }
});

const userCollection = mongoose.model("userCollection", userSchema);


module.exports = userCollection;


