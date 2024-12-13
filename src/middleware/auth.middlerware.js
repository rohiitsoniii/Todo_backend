import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const AuthProtect = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
    
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        req.user = user;
    
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error",error)
    }
   
}