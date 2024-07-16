import Admin from "../models/admin.js"
import User from "../models/user.js"
import jwt from 'jsonwebtoken'


export const AdminLogin =async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try {
        const admin = await Admin.findOne({email});
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        if (admin.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({id:admin._id,email:admin.email},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        res.cookie('access_token',token,{httpOnly:true})
        res.status(200).json({ msg: 'Login success' });
    } catch (error) {
        next(error)
    }
};

  
// Get all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Delete user
  export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Update user
  export const updateUser = async (req, res) => {
    console.log(req.body)
    const { username, email } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.username = username || user.name;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  export const logout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Logout Success!')
  }