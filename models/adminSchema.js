const mongoose = require("mongoose");
const Schema = mongoose.Schema

const adminSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
})

const adminCollection = mongoose.model("adminCollection",adminSchema);


module.exports = {
  
  adminCollection

}