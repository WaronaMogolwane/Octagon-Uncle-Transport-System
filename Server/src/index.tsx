require('dotenv').config();

const {InitDatabaseTables} = require('.//Middleware/database-helper.js')

const express = require('express');
const app = express();

const authRoute = require("./Routes/auth");
const todoListRoute = require("./Routes/todo-list");
const userProfileRoute = require("./Routes/user-profile");

const cors = require('cors');
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8081

app.use("/auth", authRoute);
app.use("/user-profile", userProfileRoute);

app.listen(PORT, function(){
    InitialiseServer();
    console.log(`Server is live on Port ${PORT}`);
})

function InitialiseServer(){
    InitDatabaseTables();
} 