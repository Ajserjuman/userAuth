const express = require("express");
const router = express.Router();


router.get('/login',(req,res)=>{
    res.render("admin/login")
})

router.get('/',(req,res)=>{
    res.send("From Admin login  bithour")
})

module.exports = router;