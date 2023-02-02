const router = require("express").Router();
const Users = require("../Database_Models/userModel");
const bcrypt = require("bcrypt");


router.post("/", async(req, res) => {
    try{
        const username = await Users.find({username:req.body.username});
        console.log(username)
        if(username.length === 0){
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if(password === confirmPassword){
            bcrypt.hash(password, 15, async(err, hash) => {
                if(err){
                    return res.status(500).json({
                        status:"failed",
                        message:err.message
                    })
                }else{
                  const newUser = await Users.create({
                    username:req.body.username,
                    password:hash
                  });
                  return res.status(200).json({
                    status:"Successfully created a new user",
                    newUser
                });                    
                }
            })
                
        }else{
            res.status(500).json({
                status:"failed",
                message:"password and confirm password must be same"
            })
        }}else{
            res.status(500).json({
                status:"failed",
                message:"user already exist"
            })
        }
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
})



module.exports = router;