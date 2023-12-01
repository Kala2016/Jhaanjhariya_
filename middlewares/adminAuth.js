const isAdminLogin = async (req,res,next)=>{
    try {

        if(req.session.admin){
            next();
        }else{
            res.redirect('./admin/pages/login')
        }
        
    } catch (error) {
        console.log(error.message);
    }

}


const isAdminLogout = async(req,res,next)=>{
    try {

        if(req.session.admin){
            res.redirect('/admin/pages/dashboard')
        }else{
            next()
            
        }        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports={

    isAdminLogin,
    isAdminLogout
}