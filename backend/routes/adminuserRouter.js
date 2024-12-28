import express from 'express'
import { loginUser, registerUser } from '../controllers/adminuserController.js'

const adminuserRouter= express.Router()

adminuserRouter.post("/register",registerUser)
adminuserRouter.post("/login",loginUser)

export default adminuserRouter