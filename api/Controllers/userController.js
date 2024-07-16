import User from '../models/user.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working properly',
  });
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      rest.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: rest },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
};
