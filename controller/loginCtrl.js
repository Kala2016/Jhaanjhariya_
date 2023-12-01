const userCollection = require("../models/userSchema");
const loginCollection = require("../models/loginSchema")
const bcrypt = require('bcrypt')

require("dotenv").config();

// password hashing-------
const securePassword = async (password) => {

    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
}

// Load Login PAge
const getLogin = (req, res) => {
  if (req.session.loginData) {
    res.render("/");
  } else {
    res.render("./users/pages/user-login");
  }
};

const postLogin = async(req,res)=>{

  try { 
      const email = req.body.email;
      const password = req.body.password;
      console.log(email);
  
      const userData = await user.findOne({email:email})
      
      if (userData) {
       const passwordMatch = await bcrypt.compare(password,userData.password)
          if(passwordMatch){
              req.session.user_id = userData._id
             res.redirect('/')
          }else{
              res.render('user-login',{message:"Email or password is incorrect"})
          }
      }else{
          res.render('user-login',{message:"Email or password is incorrect"})
  
      }   
  } catch (error) {
      console.log(error.message);
  }
  }
  

  module.exports={
    postLogin,
    getLogin,
    securePassword
}