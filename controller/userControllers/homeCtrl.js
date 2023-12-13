const userCollection = require("../../models/userSchema");
const productCollection = require("../../models/ProductSchema");


// Load Home Page
const getUserRoute = async (req,res) => {
  try {
    const loggedIn = req.session.loggedIn;
    // const productdata = await productCollection.find()
    res.render("./users/pages/home", {loggedIn});
  } catch (error) {
    console.error(error);
  }
}

// logout 
const getLogout = (req,res) => {
    try {
        req.session.user_id = null;
        res.redirect('/')        
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
  getLogout,
  getUserRoute

}