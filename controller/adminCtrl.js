const userCollection = require("../models/userSchema");
const adminCollection = require("../models/adminSchema");
const productCollection = require("../models/ProductSchema");


//Login Admin Page  
const loadLogin = async (req, res) => {  
  try {
    res.render("./admin/login", { title: "Login" });
  } catch (error) {
    console.log("error.message :", error);
  }
};

//verify Admin Login

const verifyLogin = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const userData = await user.findOne({ email: emailCheck });
    if (userData) {
      const passCheck = await bcrypt.compare(password, userData.password);
      if (passCheck) {
        if (userData.is_admin === false) {
          res.render("./admin/login", {
            message: "You're not an admin",
            title: "Login",
          });
        } else {
          req.session.admin = userData._id;
          res.redirect("./admin/dashboard");
        }
      } else {
        res.render("./admin/login", {
          message: "Invalid Email or Password",
          title: "Login",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
//load dashboard

const loadDash = async (req, res) => {
  try {
    res.render("./admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

//Logout Admin

const loadlogout = async (req, res) => {
  try {
    req.session.admin = null;
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

//admin dashboard

const adminDashboard = async (req, res) => {
  try {
    const userData = await User.findOne({ is_admin: 0 });
    res.render("./admin/dashboard", { users: userData });
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = {
  loadLogin,
  loadDash,
  adminDashboard,
  verifyLogin,
  loadlogout,
};
