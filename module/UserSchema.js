const  mongoose =require('mongoose');
const {isEmail} = require('validator');
//import mongoose from 'mongoose';
const bcrypt= require('bcrypt');
//import bcrypt from 'bcrypt';


// create in user database
const UserSchema = mongoose.Schema({

    email:{
        type:String,
        require:[true, 'please enter an email'],
        unique:true,
        lowercase:true,
         validate:[isEmail, 'please enter a valid email']
    },
    password:{
        type:String,
        require:[true, ' please enter an password'],
        minLenght:[8,'Minimum password lenght is a 6 Characters']
    },
})

// fire function after do saved db
UserSchema.post('save', (doc , next)=>{
    console.log('new user created & save ', doc)
    next();
});

//fire func befor do save db
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
      // hashing the password.
    this.password = await bcrypt.hash(this.password,salt);

next();
})

// login authnocation for user
UserSchema.statics.login = async function (email,password){
const user = await this.findOne({email});

if(user){
    const auth = await bcrypt.compare(password,user.password);
    if(auth){
        return user;
    }
    throw Error('incorrect password')
}
throw Error('incorrect email')

}

const User = mongoose.model('user',UserSchema);
module.exports= User;
//export default = UserSchema;