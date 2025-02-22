import mongoose from 'mongoose';

// Define the schema for a food item in the order
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // The ID of the user placing the order
  items: { 
    type: Array, 
    required: true, 
    // You can add more details about the items here (like price, quantity)
  },
  amount: { type: Number, required: true },  // Total amount for the order
  address: { 
    type: Object, 
    required: true, 
    // You can define this more specifically if you need address validation
  },
  status: { type: String, default: "Food Processing" },  // Initial order status
  date: { type: Date, default: Date.now },  // Use Date.now to set the current timestamp
  payment: { type: Boolean, default: false }, // Set to false until payment is completed
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
