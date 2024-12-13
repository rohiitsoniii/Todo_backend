import { User } from "../models/user.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"


const register = async (req, res) => {

    try {
        const user = req.user;
        // console.log(user);
        if(!user.isAdmin){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        
        await newUser.save()

        sendEmail(email, "Registration successful", `Hello ${name}, your account has been registered successfully your password is ${password}`);

        res.status(201).json({data: newUser, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if(user.status === "blocked"){
            return res.status(401).json({ message: "your account is blocked" });
        }

        if (!user) {
            return res.status(404).json({ message: "email is not registered with us" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "password is incorrect" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });      

        res.status(200).json({ data:{token,user}, message: "Login successful" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const users = await User.find().select("-password");
        res.status(200).json({ data: users, message: "Users fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserByAdmin = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true }).select("-password");
        res.status(200).json({ data: updatedUser, message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserByAdmin = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id).select("-password");
        res.status(200).json({ data: deletedUser, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const { status } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ data: updatedUser, message: "User status updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 const getUserByfilter = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { status } = req.query;
        const users = await User.find({ status }).select("-password");
        res.status(200).json({ data: users, message: "Users fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
export { register, login };