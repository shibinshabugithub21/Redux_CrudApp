import express from "express"
import { googleSignIn, signup,signout } from "../Controllers/authController.js"
import {signin} from '../Controllers/authController.js'
import { updateUser } from "../Controllers/userController.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.post('/google',googleSignIn,updateUser)
router.get('/signout',signout)


export default router