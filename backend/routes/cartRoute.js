import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middelware/auth.js'



const cartRouter = express.Router();

cartRouter.post("/addcart",authMiddleware,addToCart)
cartRouter.post("/removecart",authMiddleware,removeFromCart)
cartRouter.post("/getcart",authMiddleware,getCart)

export default cartRouter;