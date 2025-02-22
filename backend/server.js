// import express from 'express'
// import cors from 'cors'
// import { config } from 'dotenv'
// import { connectDB } from './config/db.js'
// import foodRouter from './routes/foodRoute.js'



// //app config

// const app = express()
// const port = 7042

// // middleware

// app.use(express.json())
// app.use(cors())

// //db connection
// connectDB();

// // api end points
// app.use("/api/food",foodRouter)
// app.use("/images",express.static('uploads'))


// app.get("/",(req,res)=>{
//     res.send(" API Working")
// })


// //run the express server
// app.listen(port,()=>{
//     console.log(`Server Started on http://localhost:${port}`)
// })


import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import 'dotenv/config.js'
import orderRouter from './routes/orderRoute.js';

// Load environment variables
config();

// App configuration
const app = express();
const port = process.env.PORT || 7042;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)


// Root Endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

// app.get('/verify', (req, res) => {
//     res.redirect('/');
// });


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Server Error" });
});

// Run the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
