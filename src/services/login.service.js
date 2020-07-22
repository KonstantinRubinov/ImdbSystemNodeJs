// routes/login.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");

// Sign-in
function Authenticate (req, res, next){
    //console.log(req.body);
    const userNickName = req.body.userNickName;
    let getUser;
    userSchema.findOne({userNickName: userNickName}).then(user => {
        if (!user || user === "undefined") {
            //console.error(user);
            console.error("No User Authentication failed");
            return res.status(401).json({message: "No User Authentication failed"});
        }
        else{
            //console.log(user);
            getUser = user;
            //console.log(user.userPassword);
            //console.log(req.body.userPassword);
            return bcrypt.compare(req.body.userPassword, getUser.userPassword);
        }
    }).then(response => {
        if (!getUser || getUser === "undefined") {
            //console.error("No response Authentication failed");
            //return res.status(401).json({message: "No response Authentication failed"});
        } else if (!response || response === "undefined") {
            //console.error("response " + JSON.stringify(response));
            console.error("No response Authentication failed");
            return res.status(401).json({message: "No response Authentication failed"});
        } else {
            //console.log("getUser " + getUser);
            let jwtToken = jwt.sign({
                userNickName: getUser.userNickName,
                userImdbPass: getUser.userImdbPass,
                userID: getUser.userID
            }, "longer-secret-is-better", {
                expiresIn: "1h"
            });
            res.status(200).json({
                usertoken: jwtToken,
                expiresIn: 3600,
                userNickName: getUser.userNickName,
                userPicture: "src/assets/images/users/" + getUser.userPicture
            });
        }
    }).catch(error => {
        console.error("Authentication failed " + error);
        return res.status(401).json({message: "Authentication failed " + error});
    });
};

module.exports ={
    Authenticate:Authenticate
};