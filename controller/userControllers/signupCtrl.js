const userCollection  = require("../../models/userSchema");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendOtp, generateOTP } = require("../../utility/nodeMailer");


//  user signup
const getUserSignup = (req, res) => {
  res.render("users/pages/user-signup");
  
};

const loadOtp = async(req,res)=>{
  res.render("users/pages/otpVerify")
}


const postUserSignup = async (req, res) => {
  try {
    console.log('req body',req.body);
    const emailCheck = req.body.email;
    const email = await userCollection.findOne({ email: emailCheck });
    console.log('mail',emailCheck);
    if (email) {
      res.render("users/pages/user-signup", {
        error: "Email already exists,Please try with new email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
        req.session.fname = req.body.fname,
        req.session.lname =req.body.lname,
        req.session.email= req.body.email,
        req.session.mobile = req.body.mobile,
        req.session.password =hashedPassword 
      

      

      const OTP = generateOTP();
      req.session.otpUser = OTP
      console.log('Sending OTP to email:', req.body.email);

      try {
        sendOtp(req.body.email, OTP,req.body.fname);
        return res.redirect("/sendOtp");
      } catch (error) {
        console.error("Error sending OTP", error);
        return res.status(500).send("Error sending OTP");
      }
    }
  } catch (error) {
    throw new Error(error)  
  }
};

const sendOTPpage = async (req, res) => {
  try {
      const email = req.session.otpUser.email
      console.log(req.session.otpUser, 'email', email);
      res.render('users/pages/otpVerify', { message: email })
  } catch (error) {
      throw new Error(error)
  }

}

const verifyOTP = async (req, res) => {
  try {
    const otpUser = req.session.otpUser;
    console.log('req,rec',otpUser);
    if (!otpUser) {
      return res.redirect("users/pages/user-signup");
    }

    const enteredOTP = req.body.otpInput;
    const userInDB = await userCollection.findOne({
      email: otpUser.email,
    });
    
    
    if (userInDB) {
      // Handle the case where the user is not found in the database
      return res.status(400).json({ error: "User not found" });
    }

    if (enteredOTP === otpUser.otp) {
      otpUser.otp = null; 
  const newUser = new userCollection({ 
    // Update user data in the database
    fname : req.session.fname,
    lname : req.session.lname,
    email : req.session.email, 
    mobile : req.session.mobile,
    password : req.session.password    
  })

      await newUser.save();

      req.session.otpUser = null;
      res.redirect("/login?message=OTP verification successful");
    } else {
      res.status(400).json({ error: "Invalid OTP, please try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const reSendOTP = (req, res) => {
  try {
    const OTP = generateOTP();

    req.session.otpUser={
    otp :{ otp: OTP },
    email:req.session.otpUser.email,
    fname:req.session.otpUser.fname
  };

    // otp resending
    try {
      sendOtp(email, OTP, fname);
      console.log('OTP is sent');
      return res.render('./users/pages/reSendOTP', { message: email });
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).send('Error sending OTP');
    }
  } catch (error) {
    console.error('Error in reSendOTP:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const verifyResendOTP = (req, res) => {
  try {
    const enteredOTP = req.body.otp;
    const storedOTP = req.session.otpUser.otp;
    

    if (enteredOTP ===storedOTP.otp) {
      const newUser = userCollection.create(req.session.otpUser);


      if (newUser) {
        delete req.session.otpUser.otp;
        req.flash('success', 'Registration success, Please login');
        return res.redirect('/login');
      } else {
        console.log('Error in inserting user');
        req.flash('error', 'Error in registration, please try again');
        return res.redirect('/user-signup');
      }
    } else {
      req.flash('error', 'Invalid OTP, please try again');
      return res.redirect('/user-signup');
    }
  } catch (error) {
    console.error('Error in verifyResendOTP:', error);
    req.flash('error', 'Internal Server Error');
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  verifyOTP,
  verifyResendOTP,
  reSendOTP,
  postUserSignup,
  getUserSignup,
  sendOTPpage,
  loadOtp
};
