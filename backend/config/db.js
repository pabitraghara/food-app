import mongoose from "mongoose";


export const connectDB =async () => {
    await mongoose.connect('mongodb://0.0.0.0/food').then(()=>{
        console.log("DB Connected")
    })
}