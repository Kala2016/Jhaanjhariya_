const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema ({
  
  catgName:{
    required: true,
    type: String,
    unique: true,
  },
  catgDiscription:{
    required: true,
    type: String,
  }
});

const categoryCollection = mongoose.model("categoryCollection", categorySchema);
module.exports = categoryCollection;