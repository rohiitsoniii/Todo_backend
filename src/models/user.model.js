import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    }
    
}, {
    timestamps: true
});

export const User = mongoose.model("User", UserSchema);