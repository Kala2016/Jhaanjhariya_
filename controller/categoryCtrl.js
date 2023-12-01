const mongoose = require("mongoose");
const multer = require("multer");
//const {uploads} = require("../multer-middleware/multer_middleware")

const categoryCollection = require("../models/categorySchema");
// const productCollection = require("../../models/product");


// render category page with data
const getCategory = async (req, res) => {
  try {
      const categories = await categoryCollection.find();
      res.render("admin/addCategory");
  } catch (error) {
      console.error(error);
  }
};

// adding catagory data
// module.exports.postCategory = async(req,res) => {
//   const categorydata = await categoryCollection.findOne({catgName: req.body.catgName});
//   if (categorydata) {
//     // res.render("admin-categorylist", {message:"Category already exit"}); 
//     res.status(500);
//   } else {
//     await categoryCollection.create({
//       catgName: req.body.catgName,
//       catgDiscription: req.body.catgDiscription,
//     })
//     const categories = await categoryCollection.find();
//     // res.render("admin-categorylist", {message: "succussfully added", categories})
//     res.status(200);
//   }
// }


// adding catagory data
module.exports.postCategory = async (req, res) => {
  try {
    const catgName = req.body.catgName;
    const categorydata = await categoryCollection.findOne({ catgName: catgName });
    if (categorydata) {
      res.status(409).json({ success: false, message: 'Category already exists' });
    } else {
      await categoryCollection.create({
        catgName: catgName,
        catgDiscription: req.body.catgDiscription,
      });
      const categories = await categoryCollection.find();
      res.status(200).json({ success: true, message: 'Category added successfully', categories });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// render edit category data page
module.exports.editCategory = async (req,res) => {
  const category=req.params.categoryId
  const categorydata = await categoryCollection.findById({_id:category})
  res.render("admin-editcategory",{categorydata})
}

// update category
module.exports.updateCategory = async(req,res) => {
  try {
    const categoryId = req.params.categoryId;
    // console.log(categoryId)
    const catagory = await categoryCollection.findById(categoryId);
    catagory.catgName = req.body.catgName;
    catagory.catgDiscription = req.body.catgDiscription;
    await catagory.save();
    // res.render("admin-editcategory")
    res.redirect("/admin/category-list")
  } catch (error) {
    console.error(error);
  }
}

// delete category
module.exports.deleteCategory = async(req,res) => {
  try {
    const catagoryId = req.params.categoryId;
    console.log(catagoryId)
    const result = await categoryCollection.deleteOne({_id:catagoryId});

    if(result.deletedCount === 1) {
      res.redirect("/admin/category-list")
    } else {
      res.status(404).send("Category not found")
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports={
  getCategory
}