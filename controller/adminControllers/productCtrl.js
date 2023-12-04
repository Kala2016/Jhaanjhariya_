const mongoose = require("mongoose");
const multer = require("multer");

const CategoryCollection = require("../../models/categorySchema");
const productCollection = require("../../models/ProductSchema");


const getaddProduct = async(req,res) => {
    try {
      const productdata = await productCollection.find()
      res.render("./admin/products");
    } catch (error) {
      console.error(error);
    }
  }

  const postProduct =async(req,res) =>{
    try {
      
    } catch (error) {
      
    }
  }



  module.exports ={
    getaddProduct
  }