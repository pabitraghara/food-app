import userModel from '../models/UserModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        // Fetch only the cartData field and initialize if not found
        const userData = await userModel.findById(userId, 'cartData');
        let cartData = userData?.cartData || new Map();

        // Convert cartData to a plain object if needed (to ensure compatibility)
        cartData = Object.fromEntries(cartData);

        // Update the quantity for the item
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update in the database, ensuring cartData is saved as an object
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true, useFindAndModify: false });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        // Fetch only the cartData field
        const userData = await userModel.findById(userId, 'cartData');
        
        // Check if user data or cartData is null
        if (!userData || !userData.cartData) {
            return res.status(404).json({ success: false, message: "User or cart data not found" });
        }

        // Convert cartData to a plain object if needed
        let cartData = Object.fromEntries(userData.cartData);

        // Check if the item exists in the cart
        if (!cartData[itemId]) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Decrease the quantity or remove the item if quantity is 1
        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        } else {
            delete cartData[itemId]; // Remove the item if quantity reaches 0
        }

        // Debug log to verify updated cartData
        console.log("Updated cartData:", cartData);

        // Update the cartData in the database
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true, useFindAndModify: false });
        
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch only the cartData field for the specified user
        const userData = await userModel.findById(userId, 'cartData');

        // Check if user and cart data exist
        if (!userData || !userData.cartData) {
            return res.status(404).json({ success: false, message: "Cart not found for the specified user" });
        }

        // Convert cartData to a plain object if it’s stored as a Map
        const cartData = Object.fromEntries(userData.cartData);

        // Send the cart data as a response
        res.json({ success: true, cart: cartData });
    } catch (error) {
        console.error("Error retrieving cart data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export { addToCart, removeFromCart, getCart };
