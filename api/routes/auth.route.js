import express from "express"
import { googleSignIn, signup } from "../Controllers/authController.js"
import {signin} from '../Controllers/authController.js'

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.post('/google',googleSignIn)


export default router