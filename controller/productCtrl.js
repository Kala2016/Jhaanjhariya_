
const mongoose = require("mongoose");
const multer = require("multer");
//const {uploads} = require("../multer-middleware/multer_middleware")

const categoryCollection = require("../models/categorySchema");
const productCollection = require("../models/ProductSchema");


const getProductList = async(req,res) => {
    try {
      const productdata = await productCollection.find()
      res.render("./admin/products");
    } catch (error) {
      console.error(error);
    }
  }




  module.exports ={
    getProductList
  }