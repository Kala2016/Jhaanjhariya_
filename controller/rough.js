// const userCollection = require("../models/userSchema");
// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv").config();
// const bcrypt = require("bcrypt");

// //  user signup
// module.exports.getUserSignup = (req, res) => {
//   res.render("./users/pages/user-signup");
// };

// // User signup and OTP verification
// module.exports.postUserSignup = async (req, res) => {
//   try {
//     console.log("aqwesrtfgyhuj", req.body);

//     const email = await userCollection.findOne({ email: req.body.email });
//     const phoneNumber = await userCollection.findOne({
//       mobile: req.body.phoneNumber,
//     });
//     console.log("email", email, "mobile", phoneNumber);
//     if (email) {
//       res.render("./users/pages/user-signup", {
//         error: "Email already exists",
//       });
//     } else if (phoneNumber) {
//       res.render("./users/pages/user-signup", {
//         error: "PhoneNumber already exists",
//       });
//     } else {
//       const otp = generateOTP();
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       // Save user details to the database
//       // try {
//       //   const newuser = await userCollection.create({
//       //     fname: req.body.fname,
//       //     lname: req.body.lname,
//       //     email: req.body.email,
//       //     mobile: req.body.mobile,
//       //     password: hashedPassword,
//       //   }, { new: true });
//       //   console.log('User created:', newuser);
//       //   // ... (continue with the rest of your code)
//       // } catch (error) {
//       //   console.error('Error creating user:', error);
//       //   res.status(500).json({ error: 'Internal Server Error' });
//       // }
//       // console.log("newuser",newuser);

//       const newuser = await userCollection.create(req.body);
//       console.log("newuser", newuser);

//       // Function to generate OTP
//       function generateOTP() {
//         return Math.floor(100000 + Math.random() * 900000);
//       }

//       // Send OTP to the user's email
//       await sendOtpToEmail(req.body.email, otp);

//       res.redirect("/login");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // sending otp 
// module.exports.getSendOtp = async (req,res) => {
//   try {
//     const phoneNumber = req.query.phoneNumber;
//     const existingUser = await userCollection.findOne({
//       $or: [
//           { email: req.query.email },
//           { mobile: phoneNumber }
//       ]
//     });
//     if (existingUser) {
//       // Handle the case where either email or phoneNumber already exists
//       if (existingUser.email === req.query.email && existingUser.phoneNumber === req.query.phoneNumber) {
//         res.status(200).json({error: "User already exists"})
//       } else  {
//         res.status(200).json({error: "User already exists"})
//       }
//   } else 
//   {

//     const email = req.query.email;

//     generatedOTP = generateOTP();

//     // Send OTP via email
//     async function sendOtpToEmail(email, otp) {
//     const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: "kalartisko@gmail.com",
//       pass: "zvxd ebqd ojed iuyf",
//     },
//   });

//   const mailOptions = {
//     from: "kalartisko@gmail.com",
//     to: email,
//     subject: "Account verification mail",
//     text: `Your OTP for verification is: ${otp}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email has been sent: " + info.response);
//     // await userCollection.updateOne({ email: email }, { $set: { otp: otp } });
//   } catch (error) {
//     console.error(error);
//     throw error; // Re-throw the error for handling in the calling function
//   }
// }

// // Verify OTP
// module.exports.postVerifyOtp = async (req, res) => {
//   try {
//     const userEnteredOTP = req.body.otp; // Assuming the OTP is sent in the request body
//     const email = req.body.email;

//     // Generate the correct OTP for the given email
//     const user = await userCollection.findOne({ email: email });
//     const correctOTP = user.otp;

//     // Check if the entered OTP is correct
//     if (
//       userEnteredOTP &&
//       correctOTP &&
//       userEnteredOTP === correctOTP.toString()
//     ) {
//       // OTP is correct
//       res.status(200).json({ message: "OTP verification successful" });
//     } else {
//       // Incorrect OTP
//       res.status(400).json({ error: "Incorrect OTP" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
