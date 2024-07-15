const bcrypt = require('bcrypt');
const Admin = require('../model/adminModel');
const validator = require ('validator')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/use');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (_id) => {
    return jwt.sign({ _id  }, JWT_SECRET, { expiresIn: '3d' });
}


// Signup controller
const adminSignup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        // Validation
        if (!username) {
            return res.status(400).json({ message: 'fill username' });
        }
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password is not strong' });
        }

        // Check if the email already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await Admin.create({ email, password: hash, username });

        // Create a token
        const token = createToken(user._id);
        res.status(201).json({ message: 'admin created successfully', user: user.username , token});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Login controller
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }

        // Check if the email exists
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const token = createToken(user._id);
        res.status(200).json({ message: 'admin logged in successfully', user: user.username, token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



module.exports = { 
    adminSignup, 
    adminLogin 
};