const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const Users = require("./Database_Models/userModel");
const Todos = require("./Database_Models/todoModel");
const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const todoRoute = require("./Routes/todo");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors("*"));


app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/allTodo", todoRoute);
app.use("/todo", todoRoute);
mongoose.set("strictQuery", false);
app.listen(8081, async() => {await mongoose.connect("mongodb+srv://mern:1999@cluster0.ngbyqsr.mongodb.net/?retryWrites=true&w=majority"), console.log("port is connected to 8081 & DB is ready")});