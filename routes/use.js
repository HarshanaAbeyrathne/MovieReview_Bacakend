const express = require('express');
const User = require('../model/userModel');

const router = express.Router()

//controller function
const {signup, login, getAllUsers} = require('../controllers/userController')

// login user
router.post('/login', login)

// signup user 
router.post('/signup', signup)

// delete user
router.delete('/:id', (req, res)=>{
    
    res.json({mssg: 'delete user'})
})

// get all users
router.get('/allUser', getAllUsers)


module.exports = router