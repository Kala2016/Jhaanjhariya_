const express = require("express");
const adminRoute = express.Router();
const session = require("express-session");
const categoryCtrl =require("../controller/categoryCtrl")
const productCtrl =require('../controller/productCtrl')
const adminCtrl = require("../controller/adminCtrl");
const adminAuth = require("../middlewares/adminAuth");

//settings
// adminRoute.set('view engine', 'ejs');
// adminRoute.set('views','.views/admin');

//Admin Login 

adminRoute.get('/',adminCtrl.loadLogin);
adminRoute.post('/', adminCtrl.verifyLogin);
adminRoute.get('/logout',adminAuth.isAdminLogin,adminCtrl.loadlogout);
adminRoute.get('/dashboard',adminCtrl.loadDash);
adminRoute.get('/addCategory',categoryCtrl.getCategory);
adminRoute.get('/products', productCtrl.getProductList);


//Product Management

// adminRoute.get('/products',productCtrl.productManagement);

adminRoute.get('/')






module.exports = adminRoute;
