const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");


router.get('/login',adminAuth.isLogin,adminController.loadLogin);

router.post('/login',adminController.login);

router.get('/dashboard',adminAuth.checkSession,adminController.loadDashboard)

router.get('/',(req,res)=>{
    res.send("From Admin login  bithour")
})

module.exports = router;