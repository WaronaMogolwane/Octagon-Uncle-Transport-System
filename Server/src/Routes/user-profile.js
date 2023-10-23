import { error } from 'console';
import {GetUserDetails} from './../Middleware/database-helper'
const express = require("express");
const router = express.Router();

router.delete("/delete-account", (req, res) =>{
    
})

router.patch("/edit-profile", (req, res) =>{
})

router.get("/GetUser", (req, res) =>{
    GetUserDetails(req.body).then((data)=>{
        res
          .status(201)
          .send(data);
    })
    .catch((error)=>{
        res
        .status(400)
        .send(error)
    })
})

module.exports = router;