const bcrypt = require("bcrypt");
const userSchema = require("../models/User");
const movieService = require("../services/movie.service");
const movieextendService = require("../services/movieextend.service");

var fs = require('fs');

function isValidIsraeliID(id) {
    id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)){
        return false;
    }
    

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    let res= Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;

    return res;
}

function createGuid(){  
    function S4() {  
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    }  
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
}

function GetAllUsers(){
    try {
        var users = userSchema.find();
        return users;
    } catch (error) {
        throw Error(error);
    }
}

function GetOneUser(userID){
    try {
        var user = userSchema.findOne({userID: userID});
        return user;
    } catch (error) {
        throw Error(error);
    }
}

function ReturnUserByNamePassword(userNickName, userPassword){
    try {
        var user = userSchema.findOne({ userNickName: userNickName, userPassword: userPassword });
        return user;
    } catch (error) {
        throw Error(error);
    }
}

function AddUser(body){
    return bcrypt.hash(body.userPassword, 10).then((hash) => {
        let extension = "";
        let pictureName = "";
        let filePath="";
        let buff="";
        let fd="";

        if(!isValidIsraeliID(body.userID)){
            throw Error(error);
        }

        if(body.userPicture!==undefined && body.userPicture!==null && body.userPicture!==""){
            extension = body.userPicture.split(".");
            extension = extension[extension.length-1];
            pictureName = createGuid()+"."+extension;
            filePath = "./src/assets/images/users/"+pictureName;
            body.userImage = body.userImage.replace(/^data:image\/\w+;base64,/, "");
            body.userImage = body.userImage.replace(/ /g, '+');
            buff = new Buffer.from(body.userImage, 'base64');
            fd =  fs.openSync(filePath, 'w');
            fs.write(fd, buff, 0, buff.length, 0, function(error,written){
                if (error!=null){
                    fs.closeSync( fd );
                    throw Error(error);
                }
                fs.closeSync( fd );
            });
            
            body.userImage = "";
        }
        
        const user = new userSchema({
            userID: body.userID,
            userFirstName: body.userFirstName,
            userLastName: body.userLastName,
            userNickName:body.userNickName,
            userPassword: hash,
            userEmail: body.userEmail,
            userGender: body.userGender,
            userBirthDate: body.userBirthDate,
            userPicture: pictureName,
            userLevel: body.userLevel,
            userImdbPass: body.userImdbPass
        });
        
        return user.save().then((response) => {
            response.userPassword = body.userPassword;
            return response;
        }).catch(error => {
            throw Error(error);
        });
    });
};

function UpdateUser(body, userID){
    try {
        var user = userSchema.findOneAndUpdate(userID, {$set: body});
        return user;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteUser(userID){
    try {
        var user = userSchema.findOneAndRemove({userID: userID});
        movieService.DeleteMoviesByUser(userID);
        movieextendService.DeleteMoviesByUser(userID);
        return user.userNickName;
    } catch (error) {
        throw Error(error);
    }
}

function DeleteUsers(){
    userSchema.deleteMany((error, data) => {
        if (error) {
            throw Error(error);
        } else {
            movieService.DeleteMovies();
            movieextendService.DeleteMovies();
            return data;
        }
    })
}

module.exports ={
    GetAllUsers:GetAllUsers,
    GetOneUser:GetOneUser,
    ReturnUserByNamePassword:ReturnUserByNamePassword,
    AddUser:AddUser,
    UpdateUser:UpdateUser,
    DeleteUser:DeleteUser,
    DeleteUsers:DeleteUsers
};