const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    username:{type:String},
    password:{type:String},   
});

const Users = mongoose.model("usersInfo", userSchema);

module.exports = Users;