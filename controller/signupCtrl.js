const userCollection = require("../models/userSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

//  user signup
module.exports.getUserSignup = (req, res) => {
  res.render("./users/pages/user-signup");
};

module.exports.postUserSignup = async (req, res) => {
  try{
    
  const email = await userCollection.findOne({email: req.body.email });
  const mobile = await userCollection.findOne({mobile: req.body.mobile});
  if (email) {
    res.render("user-signup", { error: "Email already exists" });
  } else if (mobile) {
    res.render("user-signup", { error: "PhoneNumber already exists" });
  } else {
    // await userCollection.create({
    //   fname: req.body.fname,
    //   lname: req.body.lname,
    //   email: req.body.email,
    //   mobile: req.body.mobile,
    //   password: req.body.password,      
    //   // otpInput:req.body.otpInput,
    //   status: "Unblock",
    // });
    const newuser = await userCollection.create(req.body);
      console.log("newuser", newuser);
    res.render("user-login", { message: "User sign up successfully" });
  }
  
  
  // Send OTP to the user's email
  await sendOtpToEmail(req.body.email, otp);
  
  res.redirect("/login");
   
  
}catch (error) {
console.error(error);
res.status(500).json({ error: "Internal Server Error" });
}
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

// sending otp 
module.exports.getSendOtp = async (req,res) => {
  try {
    const mobile = req.query.mobile;
    const existingUser = await userCollection.findOne({
      $or: [
          { email: req.query.email },
          { mobile: mobile }
      ]

      
    });
    if (existingUser) {
      // Handle the case where either email or phoneNumber already exists
      if (existingUser.email === req.query.email && existingUser.mobile === req.query.mobile) {
        res.status(200).json({error: "User already exists"})
      } else  {
        res.status(200).json({error: "User already exists"})
      }
  } else 
  {

    const email = req.query.email;

    generatedOTP = generateOTP();

    

      // Create a Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "kalartisko@gmail.com",
        pass: "zvxd ebqd ojed iuyf",
      },
    }); 

      //  Compose and Send an Email
    const mailOptions = {
      from: 'kalartisko@gmail.com',
      to: email,
      subject: 'Account verification mail',
      text: `Your OTP for verification is: ${generatedOTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email has been sent: ' + info.response);
      }
    });
  
    res.status(200).json({message: "OTP send to email successfully"})
  }
  } catch (error) {
    console.error(error)
  }
} 

// verify otp
module.exports.postVerifyOtp = async (req, res) => {
  try {
    const userEnteredOTP = req.query.otp;
    const email = req.body.email;

    if (userEnteredOTP && generatedOTP && userEnteredOTP === generatedOTP.toString()) {
      // OTP is correct
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      // Incorrect OTP
      res.status(400).json({ error: "Incorrect OTP" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
