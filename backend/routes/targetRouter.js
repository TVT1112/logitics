import express from 'express'
import { addtarget, deletetarget, listtarget, updatetarget } from '../controllers/targetController.js'
const targetRouter= express.Router()

targetRouter.get("/get",listtarget)
targetRouter.post("/add",addtarget)
targetRouter.put("/update",updatetarget)
targetRouter.delete("/delete",deletetarget)

export default targetRouter