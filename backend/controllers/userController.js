import userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user
const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate token for authenticated user
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// register User 
const registerUser = async (req,res) => {
    const {name,email,password} = req.body
    try {
        //User alerdy exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User alerdy exists"})
        }

        //valideteting email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a Valid Email"})
        }
        if(password.length <8){
            return res.json({success:false,message:"Enter Strong Password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)
         

        //for new User
        const newUser = new userModel({
            name:name,
            email:email,
            password:hasedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}