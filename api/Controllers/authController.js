import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


// signup
export const signup = async (req, res, next) => {
    console.log('Request Body:', req.body);
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User Created successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Error creating user", error });
    }
};


// signin
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid password'));
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:hashPassword,...rest}=validUser._doc;
        const expiryDate=new Date(Date.now() + 36000000);
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)
    } catch (error) {
        next(error); 
    }
};
