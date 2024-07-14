import User from '../models/user.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
