const session = require("express-session");
const adminSchema = require("../model/adminModel");
const bcrypt = require("bcrypt");
const saltround = 10;
const userModel = require("../model/userModel");

const loadLogin = async (req,res) =>{
    res.render('admin/login');
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        console.log(req.body);
        const admin = await adminSchema.findOne({email});

        if(!admin) return res.render('admin/login',{message:'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(isMatch);

        if(!isMatch) return res.render('admin/login',{message:'Invalid Credentials'});

        req.session.admin = true;
        res.redirect('/admin/dashboard');
        //res.redirect('admin/dashboard',{message:'Login Successfull'});
    }
    catch(error)
    {
        console.log(error);
        res.render('admin/login',{message: 'Something went Wrong'});
    }
}

const loadDashboard = async (req,res) =>{

    try{
        console.log("reached here in loading dashboard");
        const admin = req.session.admin
        if(!admin) return res.redirect('/admin/login');

        const users = await userModel.find({});
        console.log(users);
        res.render('admin/dashboard',{users});

    }
    catch(error)
    {
        res.redirect('/admin/login')
    }
    
}

module.exports = {loadLogin,login,loadDashboard};