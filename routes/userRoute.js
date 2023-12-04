// const express = require("express");
// const userRoute = express();
// const logger = require("morgan");
// const session = require("express-session");
// const cookieparser = require ("cookie-parser");

// const homeController = require("../controller/homeCtrl");
// const loginController = require("../controller/loginCtrl");
// const signupController = require("../controller/signupCtrl");
// const productController = require("../controller/productCtrl");


// // const auth = require('../middlewares/auth.js');

// //Routes Home Page

// userRoute.get('/',homeController.getUserRoute);
// userRoute.get('/logout',homeController.getLogout);

// //Routes Login Page
// userRoute.get('/login',loginController.getLogin)
// userRoute.post('/post-login',loginController.postLogin)

// //Routes Signup Page

// userRoute.get("/user-signup", signupController.getUserSignup)
// userRoute.post("/post-signup", signupController.postUserSignup)
// userRoute.get("/send-otp", signupController.sendOtpToEmail)
// userRoute.post("/verify-otp",signupController.postVerifyOtp)


// // product
// // userRoute.get("/product-details/:productId", userMiddleware.verifyUser,productController.productDetails)


// userRoute.get('/admin')

// module.exports = userRoute;


const express = require("express");
const userRoute = express.Router();
const logger = require("morgan");
const session = require("express-session");
const cookieparser = require("cookie-parser");

const homeController = require("../controller/userControllers/homeCtrl");
const loginController = require("../controller/userControllers/loginCtrl");
const signupController = require("../controller/userControllers/signupCtrl");
const productController = require("../controller/adminControllers/productCtrl");
const userCollection = require("../models/userSchema");


//Routes Home Page
userRoute.get('/', homeController.getUserRoute);
userRoute.get('/logout', homeController.getLogout); // Corrected route

//Routes Login Page
userRoute.get('/login', loginController.getLogin);
userRoute.post('/postLogin', loginController.postLogin);

userRoute.post('/sendOtp', loginController.postSendOtp);


 
//Routes Signup Page
userRoute.get("/user-signup", signupController.getUserSignup); 
userRoute.post("/post-signup", signupController.postUserSignup);
userRoute.get("/send-otp", signupController.postVerifyOtp); 
userRoute.post("/verify-otp", signupController.postVerifyOtp);





// product
// userRoute.get("/product-details/:productId", userMiddleware.verifyUser,productController.productDetails)

userRoute.get('/admin');

module.exports = userRoute;
