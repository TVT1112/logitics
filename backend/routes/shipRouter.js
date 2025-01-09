import express from 'express'
import { createship, deleteShipment, listship, updateStatus } from '../controllers/shipController.js'
const shipRouter= express.Router()

shipRouter.post("/createship",createship)
shipRouter.get("/listship",listship)
shipRouter.post("/updatestatus",updateStatus)
shipRouter.delete("/delete",deleteShipment)

export default shipRouter