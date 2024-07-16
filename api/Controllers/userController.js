import User from '../models/user.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working properly',
  });
};

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      }, { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user

export const deleteUser=async(req,res,next)=>{
  if(req.user.id !== req.params.id){
    return next(errorHandler(401,'you can delete only yuor account'))
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('user has been deleted...')
  } catch (error) {
    next(error)
  }
}