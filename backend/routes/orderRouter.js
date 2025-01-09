import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { countOrdersByDateRange, deleteOrder, getstatic, getstaticamount, getTotalAmount, listOrders, placeOrder,updateStatus,userOrders } from '../controllers/orderController.js'
const orderRouter= express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
orderRouter.get("/statitics",getstatic)
orderRouter.get("/statiticsamount",getstaticamount)
orderRouter.get("/getNumberorder",countOrdersByDateRange)
orderRouter.get("/gettotalamount",getTotalAmount)
orderRouter.delete("/delete",deleteOrder)
export default orderRouter