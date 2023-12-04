const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const collectionSchema = new Schema ({
  
  collectionName:{
    required: true,
    type: String,
    unique: true,
  },
  
  collectionDescription:{
    required: true,
    type: String,
  }
});

const CollectionModel = mongoose.model("CollectionModel", collectionSchema);

module.exports = CollectionModel;
