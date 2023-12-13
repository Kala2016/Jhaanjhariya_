const userCollection = require('../../models/userSchema')
const multer = require("multer");



const getUser = async (req, res) => {
  try {
      const findUsers = await userCollection.find();   
      res.render('./admin/pages/userList', { users: findUsers, title: 'UserList' });
  } catch (error) {
      console.error('error in getUser',error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// const userManagement = async (req, res) => {

//   try {
//       const findUsers = await userCollection.find();

//       res.render('./admin/userList', { users: findUsers, title: 'UserList' })
//   } catch (error) {
//       throw new Error(error)
//   }
// }
// searchUser
const searchUser = async (req, res) => {

  try {

      const data = req.body.search
      const searching = await userCollection.find({ fname: { $regex: data, $options: 'i' } });
      if (searching) {
          res.render('./admin/userList', { users: searching, title: 'Search' })
      } else {
          res.render('./admin/userList', { title: 'Search' })
      }


  } catch (error) {
      throw new Error(error)
  }
}
// Block a User
const blockUser = async (req, res) => {
  try {
      const id = req.params.id;
      const finduser = await userCollection.findByIdAndUpdate(id, { isBlock: true }, { new: true });
      console.log(finduser);
      res.redirect('/admin/userList');
  } catch (error) {
      throw new Error(error)
  }
};

// Unblock a User
const unBlockUser = async (req, res) => {
  try {
      const id = req.params.id;
      await userCollection.findByIdAndUpdate(id, { isBlock: false }, { new: true });
      res.redirect('/admin/userList');
  } catch (error) {
      throw new Error(error);
  }
};


module.exports={
  // userManagement,
    getUser,
    blockUser,
    unBlockUser,
    searchUser
}