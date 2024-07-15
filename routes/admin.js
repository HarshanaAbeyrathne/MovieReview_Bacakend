const express = require('express');
const Admin = require('../model/adminModel');

const router = express.Router()

//controller function
const {adminSignup, adminLogin} = require('../controllers/adminController')

// login admin
router.post('/login', adminLogin)

// signup admin
router.post('/signup', adminSignup)

// delete admin
router.delete('/:id', (req, res)=>{
    
    res.json({mssg: 'delete admin'})
})



module.exports = router