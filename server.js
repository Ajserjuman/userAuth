const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const connectDB = require("./db/connectDb");
const session = require("express-session");
const nocache = require("nocache");


app.use(nocache());
app.use(session({
    secret:'mysecretkey',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge:1000*60*60*24}
}))
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
    res.redirect('user/login');
});

connectDB();

app.listen(3000,()=>{
    console.log("server started");
})