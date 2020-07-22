const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const { check } = require('express-validator');
const authorize = require("../middlewares/auth");


router.route("/users",
      [
          check('userID').not().isEmpty().isLength({ min: 8 }).withMessage('Id must be atleast 8 characters long'),
          check('userFirstName').not().isEmpty().isLength({ min: 2, max: 40 }).withMessage('First Name must be atleast 2-40 characters long'),
          check('userLastName').not().isEmpty().isLength({ min: 2, max: 40 }).withMessage('Last Name must be atleast 2-40 characters long'),
          check('userNickName').not().isEmpty().isLength({ min: 2, max: 40 }).withMessage('Nick Name must be atleast 2-40 characters long'),
          check('userPassword', 'Password is required').not().isEmpty(),
          check('userEmail', 'Email is required').not().isEmpty(),
          check('userGender', 'Gender is required').not().isEmpty(),
      ]
    ).get(authorize,userService.GetAllUsers);
router.route("/users/:userID").get(authorize,userService.GetOneUser);
router.route("/users/check").post(authorize,userService.ReturnUserByNamePassword);
router.route("/users").post(userService.AddUser);
router.route("/users/:userID").put(authorize,userService.UpdateUser);
router.route("/users/:userID").delete(authorize,userService.DeleteUser);
router.route("/users").delete(userService.DeleteUsers);

module.exports = router;