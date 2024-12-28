import express from 'express'
import { addTocart,removeFromcart ,getCart} from '../controllers/cartController.js'
import authMiddware from '../middleware/auth.js'

const cartRouter= express.Router()

cartRouter.post("/add",authMiddware,addTocart)
cartRouter.post("/remove",authMiddware,removeFromcart)
cartRouter.post("/get",authMiddware,getCart)

export default cartRouter