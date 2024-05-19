const user= require('../module/UserSchema');
const jwt= require('jsonwebtoken');

// handle errors

const handleError=(err)=>{
console.log(err.message,err.code);

let errors={email : '',password:''};

// error for email
if(err.message='incorect email'){
    errors.email='Email is not register';
}

// error for password
if(err.message='incorrect password'){
    errors.password='Passowrd is incorrect';
}

// duplicte erors code

if(err.code ==1100){
    errors.email='Email already exist'
    return errors;
}

// validation errors

if(err.message.includes('user validation failed')){
    Object.values(err.error).forEach(({properties})=>{
        errors[properties.path]=properties.message
    });
}
return errors;
}





//expire date jwt
const ageMax= 3*24*60*60;

//function for create token

const createtoken = (id)=>{
    return jwt.sign({id}, 'secret',{
        expiresIn:ageMax
    });
}
//  module.exports.get_signup=
module.exports.get_signup =(req,res)=>{
    res.render('signup');
}
module.exports.get_login=(req,res)=>{
    res.render('login')
}
module.exports.post_signup= async (req,res)=>{
const {email,password}=req.body
try {
    const User = await user.create({
        email,
        password
    })

    const token =createtoken(User._id);
    res.cookie('jwt',token,{httpOnly:true,ageMax:ageMax*1000});
    res.status(201).json({User:User._id});
} catch (error) {
    const errors=handleError(error)
    res.status(400).json({errors});
}

}
module.exports.post_login= async (req,res)=>{
    const {email,password} =req.body;
try {
    const User = await user.login(email,password);
    const token = createtoken(User._id);
    res.cookie('jwt',token,{httpOnly:true,ageMax:ageMax*1000});
    res.status(200).json({User:User._id})
} catch (error) {
    const errors=handleError(error)
    res.status(400).json({errors});
}
}
module.exports.get_logout=(req,res)=>{
    // cookie jwt to replace empty cookie for 1 min

  res.cookie('jwt','',{ageMax:1});

  res.redirect('/login')
}
