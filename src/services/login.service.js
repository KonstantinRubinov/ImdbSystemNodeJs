const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");

function Authenticate(userNickName, userPassword){
    let getUser;
    try {
        return userSchema.findOne({userNickName: userNickName}).then(user => {
            if (!user || user === undefined) {
                console.error("No User - Authentication failed");
                throw Error("No User - Authentication failed")
            }
            else{
                getUser = user;
                return bcrypt.compare(userPassword, getUser.userPassword);
            }
        }).then(response => {
            if (!getUser || getUser === undefined) {
            } else if (response==false || response == undefined) {
                console.error("No response Authentication failed");
                throw Error("No response Authentication failed")
            } else {
                let jwtToken = jwt.sign({
                    userNickName: getUser.userNickName,
                    userImdbPass: getUser.userImdbPass,
                    userID: getUser.userID
                }, "longer-secret-is-better", {
                    expiresIn: "1h"
                });
                return {
                    usertoken: jwtToken,
                    expiresIn: 3600,
                    userNickName: getUser.userNickName,
                    userPicture: "src/assets/images/users/" + getUser.userPicture
                };
            }
        }).catch(error => {
            console.error("Authentication failed " + error.message);
            throw Error("Authentication failed " + error.message)
        });
    } catch (error) {
        console.error("Authentication failed " + error.message);
        throw Error("Authentication failed " + error.message)
    }
};

module.exports ={
    Authenticate:Authenticate
};