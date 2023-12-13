const mongoose = require("mongoose");
const multer = require("multer");
//const {uploads} = require("../multer-middleware/multer_middleware")

const CategoryCollection = require("../../models/categorySchema");



// render category page with data
const getCategory = async (req, res) => {
  try {
      const categories =await CategoryCollection.find({})
      res.render("admin/pages/addCategory",{title:'addCategory',categories});
  } catch (error) {
      console.error(error);
      res.status(500).json({success: false,message:'Internal Server Error'})
  }
};

const postCategory = async (req, res) => {
  try {
    const {categoryName} = req.body
    
    const categoryData = await CategoryCollection.findOne({ categoryName: categoryName });
    
    if (categoryData) {
      res.status(409).json({ success: false, message: 'Category already exists' });
    } else {
    const catg =  await CategoryCollection.create({
        categoryName: categoryName,        
        
      });
      
      const categories = await CategoryCollection.find({});
  
      res.status(200).json({ success: true, message: 'Category added successfully', categories });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  getCategory,
  postCategory
}