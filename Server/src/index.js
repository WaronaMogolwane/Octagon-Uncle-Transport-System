require('dotenv').config();
const cors = require('cors');
const {InitDatabaseTables} = require('./Models/DatabaseModel.js')
const express = require('express');
const app = express();
const authRoute = require("./Routes/AuthenticationRoutes.js");
const userProfileRoute = require("./Routes/UserDetailRoutes.js");

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