const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../Database_Models/userModel");

router.post("/", async(req, res) => {
    try{
       const {username, password} = req.body;

       const userCheck = await Users.findOne({username:username});
       console.log(userCheck)
       if(userCheck !== null){
           bcrypt.compare(password, userCheck.password, (err, result) => {
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }else{
                if(result){
                    const token = jwt.sign({
                        exp:Math.floor(Date.now() / 1000) + 60 * 60,
                        data:userCheck._id,
                    }, 
                    "qwertyuiopasdfghjklzxcvbnm"
                    );
                    return res.json({
                        status:"success",
                        message:"Successfully Login",
                        token:token,
                        username:userCheck.username,
                    })
                }else{
                    res.status(500).json({
                        status:"failed",
                        message:"Incorrect password"
                    })
                }
            }
           })
       }else{
        res.status(500).json({
            status:"failed",
            message:"user doesn't exist, please register"
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