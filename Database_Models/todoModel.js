const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    activity:{type:String},
    status:{type:String, default:"Pending"},
    startTime:{type:String},
    endTime:{type:String},
    userId:{type:mongoose.Types.ObjectId, ref:"usersInfo"}
});

const Todos = mongoose.model("todoIndo", todoSchema);

module.exports = Todos;