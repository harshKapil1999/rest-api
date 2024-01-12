const express = require("express");
const router = express.Router();

const { 
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
 } = require('../controllers/user.controller.js')


//GET & POST Request
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);


//Merging all requests with id 
router.route('/:id')
.get( handleGetUserById)
.patch( handleUpdateUserById)
.delete( handleDeleteUserById);


module.exports = router;