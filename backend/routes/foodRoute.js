// import express from'express';

// import { addFood, listFood, removeFood } from '../controllers/foodController.js';
// import multer from 'multer';

// const foodRouter = express.Router();

// //image Storage 
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })
// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood)
// foodRouter.get("/list",listFood)
// foodRouter.post("/remove",removeFood)


// removeFood


// export default foodRouter;




import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Define Routes
foodRouter.post("/add", addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
