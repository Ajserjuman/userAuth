const userSchema = require('../model/userModel');
const bcrypt = require("bcrypt");
var saltround = 10;

const loadRegister = async(req,res) => {
    res.render('user/register');
}

const loadLogin = async(req,res) => {
    res.render('user/login');
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await userSchema.findOne({email});

        if(!user) return res.render('user/login',{message:'User does not exist'});

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if(!isMatch) return res.render('user/login',{message:'Incorrect Password'});

        req.session.user = true;
        res.render('user/userHome',{message:'Login Successfull'});
    }
    catch(error)
    {
        console.log(error);
        res.render('user/register',{message: 'Something went Wrong'});
    }
}

const registerUser = async (req,res) => {
    console.log('inside here',req.body);
    try{
        const {email,password} = req.body
        const user = await userSchema.findOne({email})
        if(user)
        {
            return res.render('user/register',{message:`User Alredy Exists`})
        }

        const hashedPassword = await bcrypt.hash(password,saltround);
        const newUser = new userSchema({
            email,
            password:hashedPassword
        })
  
        await newUser.save()

        res.render('user/login',{message:`User Created Successfully`});


    }
    catch(error)
    {
        console.log(error);
        res.render('user/register',{message: 'Something went Wrong'});
    }
}

const loadHome = async (req,res) =>{
    res.render('user/userHome');
}

const logout = async (req,res) =>{
    req.session.user = null;
    res.redirect('/user/login');
}

module.exports = {registerUser,loadRegister,loadLogin,loadHome,login,logout}