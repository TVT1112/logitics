import express from 'express'
import { getAlluser, loginUser, registerUser } from '../controllers/adminuserController.js'

const adminuserRouter= express.Router()

adminuserRouter.post("/register",registerUser)
adminuserRouter.post("/login",loginUser)
adminuserRouter.get("/getuser",getAlluser)

export default adminuserRouter