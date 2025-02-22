import express from 'express';
import authMiddleware from '../middelware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js';



const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
export default orderRouter;
orderRouter.post("/userorder",authMiddleware,userOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)