const mongoose = require("mongoose");
const multer = require("multer");
//const {uploads} = require("../multer-middleware/multer_middleware")

const CategoryCollection = require("../../models/categorySchema");
// const productCollection = require("../../models/product");


// render category page with data
const getCategory = async (req, res) => {
  try {
      res.render("admin/addCategory",{title:'addCategory'});
  } catch (error) {
      console.error(error);
  }
};

const postCategory = async (req, res) => {
  try {
    const {categoryName,catgDescription} = req.body
    console.log('category',req.body);
    const categoryData = await CategoryCollection.findOne({ categoryName: categoryName });
    console.log('asdfghjk',categoryData);
    if (categoryData) {
      res.status(409).json({ success: false, message: 'Category already exists' });
    } else {
    const catg =  await CategoryCollection.create({
        categoryName: categoryName,        
        catgDescription:catgDescription,
      });
      console.log('after insert',catg);
      const categories = await CategoryCollection.find({});
      // res.redirect('/addCategory')
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