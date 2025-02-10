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

        if(!user) return res.render('user/login',{message:'User_does_not_exist'});
        if(user.password !=password) return res.render('user/login',{message:'Incorrect_Password'});

        res.render('user/home','Login Successfull');
    }
    catch(error)
    {

    }
}

const registerUser = async (req,res) => {
    console.log('inside here',req.body);
    try{
        const {email,password} = req.body
        const user = await userSchema.findOne({email})
        if(user)
        {
            return res.render('user/register',{message:`UserAlredyExists`})
        }

        const hashedPassword = await bcrypt.hash(password,saltround);
        const newUser = new userSchema({
            email,
            password:hashedPassword
        })
  
        await newUser.save()

        res.render('user/login',{message:`UserCreatedSuccessfully`});


    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = {registerUser,loadRegister,loadLogin}