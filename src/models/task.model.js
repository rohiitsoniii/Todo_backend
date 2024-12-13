import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed","on-hold"],
        default: "pending"
    },
   expectedTime: {
       type: Date
       
   },
   actualTime: {
       type: Date
   },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
});

export const Task = mongoose.model("Task", TaskSchema);