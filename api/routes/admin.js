import express from 'express'
const router = express.Router()
import {AdminLogin,getAllUsers,deleteUser,updateUser, logout} from '../Controllers/adminController.js'
import {verifyToken} from '../utils/verifyUser.js'



router.post('/login', AdminLogin);
router.get('/users',verifyToken, getAllUsers)
router.delete('/deleteUser/:id',verifyToken,deleteUser)
router.put('/update/:id',verifyToken,updateUser)
router.get('/logout',logout)


export default router   