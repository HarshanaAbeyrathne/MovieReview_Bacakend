const express = require('express');
const User = require('../model/userModel');

const router = express.Router()

//controller function
const {signup, login, getAllUsers, deleteUser} = require('../controllers/userController')

// login user
router.post('/login', login)

// signup user 
router.post('/signup', signup)

// delete user
router.delete('/:id', deleteUser)

// get all users
router.get('/allUser', getAllUsers)


module.exports = router