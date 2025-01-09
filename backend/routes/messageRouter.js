import express from "express";
import { getmessage, sendmessage } from "../controllers/messageController.js";

const messRouter= express.Router()

messRouter.get("/:userId/userId2",getmessage)
messRouter.post("/send",sendmessage)

export default messRouter