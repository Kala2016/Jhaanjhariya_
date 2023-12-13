const express = require("express");
const userRoute = express.Router();
const logger = require("morgan");
const session = require("express-session");
const cookieparser = require("cookie-parser");

const homeController = require("../controller/userControllers/homeCtrl");
const loginController = require("../controller/userControllers/loginCtrl");
const signupController = require("../controller/userControllers/signupCtrl");





//Routes Home Page
userRoute.get('/', homeController.getUserRoute);
userRoute.get('/logout', homeController.getLogout); // Corrected route

//Routes Login Page
userRoute.get('/login', loginController.getLogin);
userRoute.post('/postLogin',loginController.postLogin)

 
//Routes Signup Page
userRoute.get("/user-signup", signupController.getUserSignup); 
userRoute.post("/user-signup", signupController.postUserSignup);
userRoute.get('/sendOtp',signupController.sendOTPpage);
userRoute.post('/sendOtp',signupController.verifyOTP);
userRoute.get('/otpVerify',signupController.loadOtp);
userRoute.post('/verify-otp',signupController.verifyOTP)
userRoute.get('/reSendOtp',signupController.reSendOTP)
userRoute.post('reSendOtp',signupController.verifyResendOTP)









module.exports = userRoute;
