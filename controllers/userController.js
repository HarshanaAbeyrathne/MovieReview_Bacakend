const bcrypt = require('bcrypt');
const User = require('../model/userModel');
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
const signup = async (req, res) => {
    try {
        const { email, password, name, mobile } = req.body;
        
        // Validation
        if (!name || !mobile) {
            return res.status(400).json({ message: 'fill name and mobile' });
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
        if(!validator.isMobilePhone(mobile)){
            return res.status(400).json({ message: 'Mobile is not valid' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({ email, password: hash, name, mobile });

        // Create a token
        const token = createToken(user._id);
        res.status(201).json({ message: 'User created successfully', user , token});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the username exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'email not exists' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        console.log(password)
        console.log(user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
            
        }
        
        // Create a token
        const token = createToken(user._id);
        return res.status(200).json({ message: 'Login successful', user: user.name,token});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    signup,
    login,
};
