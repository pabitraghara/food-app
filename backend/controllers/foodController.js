
// import foodModel from "../models/FoodModel.js";
// import fs from 'fs'
// // Add food item
// const addFood = async (req, res) => {
//     if (!req.description ||!req.file || !req.body.name || !req.body.price || !req.body.category) {
//         return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     let image_filename = req.file.filename;

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         image: image_filename,
//         category: req.body.category,
//     });

//     try {
//         await food.save();
//         res.status(201).json({ success: true, message: "Food added successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };

// // all food list
// const listFood = async (req,res) =>{
//     try {
//         const food = await foodModel.find({})
//         res.json({
//             success:true,
//             data:food
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// //remove foo item

// const removeFood = async (req,res)=>{
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})
//         await foodModel.findByIdDelete(res.body.id)
//         res.json({success:true,message:"Food Remove"})
//     } catch (error) {
//         console.log({success:false,message:"Food Not Remove"})
//     }
// }
// export { addFood,listFood,removeFood};




import foodModel from "../models/FoodModel.js";

// Add food item
const addFood = async (req, res) => {
    // if (!req.body.description || !req.body.name || !req.body.price || !req.body.category) {
    //     return res.status(400).json({ success: false, message: "Missing required fields" });
    // }

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    });

    try {
        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({
            success: true,
            data: food,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching food list", error: error.message });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food item", error: error.message });
    }
};

export { addFood, listFood, removeFood };
