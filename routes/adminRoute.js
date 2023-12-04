const express = require("express");
const adminRoute = express.Router();
const session = require("express-session");
const categoryCtrl = require("../controller/adminControllers/categoryCtrl");
const productCtrl = require("../controller/adminControllers/productCtrl");
const adminCtrl = require("../controller/adminControllers/adminCtrl");
const userCtrl = require("../controller/adminControllers/userCtrl");
const adminAuth = require("../middlewares/adminAuth");
const collectionCtrl = require("../controller/adminControllers/collectionCtrl");


//settings
// adminRoute.set('view engine', 'ejs');
// adminRoute.set('views','.views/admin');

//Admin Login

adminRoute.get("/", adminCtrl.getAdminRoute);
adminRoute.post("/dashboard", adminCtrl.postAdminRoute);
adminRoute.get("/logout", adminAuth.isAdminLogin, adminCtrl.loadlogout);
adminRoute.get("/dashboard", adminCtrl.loadDash);


//Product Management
adminRoute.get("/products", productCtrl.getaddProduct);


//Category Management

adminRoute.get("/addCategory", categoryCtrl.getCategory);
adminRoute.post("/addCategory",categoryCtrl.postCategory)

//Collections Management
adminRoute.get("/addCollections", collectionCtrl.getCollections);
adminRoute.post("/addCollections", collectionCtrl.postCollection);

adminRoute.get("/addProducts", productCtrl.getaddProduct);

//User Management
adminRoute.get("/userManagement",userCtrl.getUser)
adminRoute.get("/block-user:userid",userCtrl.blockUser)
adminRoute.get("/unblock-user:userid",userCtrl.unblockUser)


adminRoute.get("/");

module.exports = adminRoute;
