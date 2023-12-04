const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema ({
  
  categoryName:{
    required: true,
    type: String,
    // unique: true,
  },
   catgDescription:{
    required: true,
    type: String,
  }
});

const CategoryCollection = mongoose.model("CategoryCollection", categorySchema);

module.exports = CategoryCollection;
