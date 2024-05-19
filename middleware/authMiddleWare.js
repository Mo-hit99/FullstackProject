const jwt= require('jsonwebtoken');
const User= require('../module/UserSchema');




const requireAuth = (req,res,next)=>{
  const token = req.cookies.jwt;

 // check json web token exisy & is verified

 if(token){
    jwt.verify(token,'secret', (err,decodedToken)=>{
        if(err){
            console.log(err.message)
            res.redirect('/login');
        }else{
            console.log(decodedToken);
            next();
        }

    })
 }else{
    res.redirect('/login');
 }

}



//check Current User
const currUser = (req,res,next)=>{

    const tokken = req.cookies.jwt;

    if(tokken){
        jwt.verify(tokken,'secret', async (err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user=null;
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user =user;         // when we show user email to navigetion link
                next();
            }
        })

    }else{
        res.locals.user=null;
        next();
    }
}


const result = {requireAuth ,currUser}

module.exports =result