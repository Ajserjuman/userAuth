const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const connectDB = require("./db/connectDb");

//view engine steup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
//static setup
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.get('/',(req,res)=>
{
    res.render('user/login');
});

connectDB();

app.listen(3000,()=>{
    console.log("server started");
})