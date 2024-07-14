import express from "express"
import { signup } from "../Controllers/authController.js"
import {signin} from '../Controllers/authController.js'

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)


export default router