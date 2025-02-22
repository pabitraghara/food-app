import orderModel from "../models/OrderModel.js";
import userModel from '../models/UserModel.js';
import { Stripe } from 'stripe';

// Initialize Stripe with the secret key from the environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place the user's order and initiate Stripe payment
const placeOrder = async (req, res) => {
    const frontend_Url = "http://localhost:5174"; // Update this to your actual frontend URL

    try {
        console.log("Request body:", req.body);  // Log incoming request

        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,  // Assuming items is an array of items (food info)
            amount: req.body.amount, // Total amount
            address: req.body.address, // Delivery address
        });

        await newOrder.save();  // Save the order to the database
        console.log("Order saved:", newOrder);

        // Clear cart data for the user after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        console.log("Cart cleared for user:", req.body.userId);

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",  // Ensure the currency is set to USD
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,  // Stripe requires amount in cents
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",  // Delivery charges in USD
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Delivery charge in cents
            },
            quantity: 1,
        });

        console.log("Line items prepared:", line_items);

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],  // Define payment method types explicitly
            line_items: line_items, // List of items for checkout
            mode: 'payment',  // Use 'payment' for one-time payments
            success_url: `${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_Url}/verify?success=false&orderId=${newOrder._id}`,
        });


        console.log("Stripe session created:", session.id);

        // Return the session URL to the frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error placing the order:", error.message);
        res.json({ success: false, message: error.message || "Error placing the order" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })

        }

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "Error" })
    }
}


// user order for frontend
const userOrder = async (req, res) => {
    try {
        // Corrected to use req.body.userId
        const orders = await orderModel.find({ userId: req.body.userId });
        
        // Return the orders data as a response
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        // Return error message if there is an issue
        res.json({ success: false, message: "Error" });
    }
};

// listhing order for admin panel
const listOrders = async (req,res)=>{
    try {
        const order =  await orderModel.find({});
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }
}

// api of updating order status
const updateStatus = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Success Update"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }
}

export { placeOrder, verifyOrder, userOrder,listOrders,updateStatus };
