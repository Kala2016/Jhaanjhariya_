
const userCollection = require("../../models/userSchema");
const adminCollection = require("../../models/adminSchema");


//Login Admin Page  
const getAdminRoute = async (req, res) => {  
  try {
    res.render("./admin/login", { title: "Login" });
  } catch (error) {
    console.log("error.message :", error);
  }
};

//verify Admin Login

const postAdminRoute = async (req,res)=>{
  try {
    
    const data =await adminCollection.findOne({email:req.body.email});
    // const user =await userCollection.find({});

    if(data){
      if(req.body.email !== data.email && req.body.password === data.password){
        res.redirect('/users/pages/home')
      }else if(req.body.email === data.email && req.body.password !== data.password){
        res.redirect('/')
      }else{
      if(req.body.email === data.email && req.body.password === data.password){
        res.render('./admin/dashboard');
      }
      }
    } else{
      res.render('/')
    } 
  }catch (error) {
    console.log(error.message);
  }
}
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
  getAdminRoute,
  postAdminRoute,  
  loadDash,
  adminDashboard,
  loadlogout,

};
