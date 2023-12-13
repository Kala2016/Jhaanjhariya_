const express = require("express");
const adminRoute = express.Router();
const session = require("express-session");
const { isAdminLoggedIn, isAdminLoggedOut } = require('../middlewares/adminAuth')
const { adminValidateID } = require('../middlewares/idValidation')
const { upload } = require('../config/upload')
const categoryCtrl = require("../controller/adminControllers/categoryCtrl");
const productCtrl = require("../controller/adminControllers/productCtrl");
const adminCtrl = require("../controller/adminControllers/adminCtrl");
const userCtrl = require("../controller/adminControllers/userCtrl");
const collectionCtrl = require("../controller/adminControllers/collectionCtrl");


const dotenv = require("dotenv").config();


//settings
// adminRoute.set('view engine', 'ejs');
// adminRoute.set('views','.views/admin');

//Admin Login
adminRoute.get('/', isAdminLoggedOut, adminCtrl.loadLogin)
adminRoute.post('/', adminCtrl.verifyAdmin);
adminRoute.get('/logout', isAdminLoggedIn, adminCtrl.logout)
adminRoute.get('/dashboard', isAdminLoggedIn, adminCtrl.loadDashboard)




//Product Management
adminRoute.get("/Products",productCtrl.productManagement)
adminRoute.get("/Products",productCtrl.addProduct)
adminRoute.get("/addProducts",productCtrl.addProduct)
adminRoute.post('/addProducts',
        upload.fields([{ name: "images" }]),
        productCtrl.insertProduct) /** Product adding and multer using  **/
adminRoute.post('/Products/list/:id', productCtrl.listProduct)
adminRoute.post('/Products/unList/:id', productCtrl.unListProduct)  
adminRoute.get('/Products/editProduct',productCtrl.editProduct)    
adminRoute.get('/Products/editproduct/:id', productCtrl.editProductPage)
adminRoute.post('/Products/editproduct/:id', productCtrl.updateProduct)
// adminRoute.put('/Products/edit-image/:id', upload.single("image"), productCtrl.editImage)
adminRoute.delete('/Products/delete-image/:id', productCtrl.deleteImage)
 
//Category Management   

adminRoute.get("/addCategory", categoryCtrl.getCategory);
adminRoute.post("/addCategory",categoryCtrl.postCategory)

//Collections Management
adminRoute.get("/addCollections", collectionCtrl.getCollections);
adminRoute.post("/addCollections", collectionCtrl.postCollection);



//User Management
adminRoute.get("/userList",userCtrl.getUser);
adminRoute.post("/userList/search",userCtrl.searchUser)
adminRoute.post("/userList/blockUser/:id",userCtrl.blockUser)
adminRoute.post("/userList/unBlockUser/:id",userCtrl.unBlockUser)




module.exports = adminRoute;
