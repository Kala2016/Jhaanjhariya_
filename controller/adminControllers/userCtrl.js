
const userCollection = require('../../models/userSchema')
const mongoose = require("mongoose");
const multer = require("multer");



const getUser = async (req,res)=>{
    try {    
        res.render('./admin/userManagement',{tiltle:'Login'})
    } catch (error) {
        console.log(error.message);
        
    }

}

module.exports.postSearchUser = async()=>{

    try {
        const userData = req.body.search
        const search = await userCollection.find({email:{$regex: data,$options: 'i' }});
        if (search){
            res.render('./admin/userManagement',{users:title ,title :'Search'});

        }else{
            res.render('./admin/userManagement',{title:'Search'});
        }
      
    } catch (error) {
        console.log(error.message);
    }

};


const blockUser=(req,res)=>{
    try {

        const iduser = req.params.userid               
        const newUser = userCollection.findOne({_id:iduser});
        const updateUser = userCollection.updateOne({_id:iduser},{$set:{status:"Block"}})
        res.redirect("./admin/userManagemet")
                
    } catch (error) {
        console.log(error.message);
        
    }
}


const unblockUser=(req,res)=>{
    try {
        const iduser = req.params.userid
        const newUser =userCollection.findOne({_id:iduser});
        const updateUser = userCollection.updateOne({_id:iduser},{$set:{status:"Unblock"}})
        res.redirect("./admin/userManagemet")
        
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports={
    getUser,
    blockUser,
    unblockUser
}