import express from 'express'
import { generate } from '../controllers/chatbotConttroller.js'

const chatbotRouter= express.Router()

chatbotRouter.post("/generate",generate)

export default chatbotRouter