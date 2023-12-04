const userCollection = require("../../models/userSchema");
const loginCollection = require("../../models/loginSchema");
const bcrypt = require("bcrypt");

const transporter = require("../../config/emailSender");

require("dotenv").config();

// password hashing-------
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

// Load Login PAge
const getLogin = (req, res) => {
  if (req.session.loginData) {
    res.render("/");
  } else {
    res.render("./users/pages/user-login");
  }
};

const postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    const userData = await userCollection.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        req.session.user_id = userData._id;
        console.log("match");
        res.redirect("/");
      } else {
        res.render("users/pages/user-login.ejs", {
          message: "Email or password is incorrect",
        });
      }
    } else {
      res.render("users/pages/user-login.ejs", {
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postSendOtp = async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email);

    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000);
    }

    let generatedOTP = generateOTP();
    const hashedOtp = res.cookie("otp", generatedOTP);

    const mailOptions = {
      from: "kalartisko@gmail.com",
      to: email,
      subject: "Account verification mail",
      text: `Your OTP for verification is: ${generatedOTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email has been sent: " + info.response);
      }
    });

    res.status(200).json({ message: "OTP send to email successfully" });

    // console.log(email)
  } catch (error) {}
};

module.exports = {
  postLogin,
  getLogin,
  securePassword,
  postSendOtp,
};
