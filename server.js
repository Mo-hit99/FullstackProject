const express =require('express')
const mongoose =require('mongoose');
const authRoutes =require('./routes/AuthRouter');
const cookieParser =require('cookie-parser');
const {requireAuth,currUser} = require('./middleware/authMiddleWare');

const PORT=process.env.port || 8080; //port
const app =express();

//middlewar
app.use(express.static('public'));
app.use(express.json());// json
app.use(cookieParser()); // stored cokkie paser locals



//ejs
app.set('view engine', 'ejs')





// connection to Data base
const mongooseUrl='mongodb://localhost:27017/UserDataBase'
const connetion = async()=>{
    try {
       await mongoose.connect(mongooseUrl)
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}



//server get
app.get('*',currUser); // middleware
app.get('/',requireAuth,(req,res)=>{ // requireAuth Middleware here
    res.render('home');
});
//routes
app.use(authRoutes);


//start server
app.listen(PORT,()=>{
      console.log(`server start at http://localhost:${PORT}`)
      connetion();
})



