const router = require("express").Router();
const Todos = require("../Database_Models/todoModel");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, "qwertyuiopasdfghjklzxcvbnm", (err, decoded) => {
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:"Please login again"
                });
            }
            req.userId = decoded.data;
            next();
        });
    }else{
        res.json({
            status:"failed",
            message:"Login to make a task"
        })
    }
}

router.get("/", async(req, res) => {
    try{
        const todos = await Todos.find({userId: req.userId});
        res.status(200).json({
            status:'success',
            todos
        })

    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
});

router.post("/", authentication,async(req, res) => {
    try{
        const newTodo = await Todos.create({
             activity:req.body.activity,
        });

        res.status(200).json({
            status:"success",
            newTodo
        })

    }catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
})


module.exports = router;