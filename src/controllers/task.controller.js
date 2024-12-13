import { Task } from "../models/task.model.js";


const createTask = async (req, res) => {
    try {
        const user = req.user;

        const { title, description, status, expectedTime, actualTime } = req.body;

        if (!title || !description || !status || !expectedTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = new Task({ title, description, status, expectedTime, actualTime, user: user._id });
        await task.save();
        res.status(201).json({ data: task, message: "Task created successfully" });
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        if (user.isAdmin) {
            const task = await Task.findOneAndDelete({ _id: id });
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ data: task, message: "Task deleted successfully" });
        }
        const task = await Task.findOneAndDelete({ _id: id, user: user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ data: task, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const user = req.user;
        if (user.isAdmin) {
            const tasks = await Task.find();
            res.status(200).json({ data: tasks, message: "Tasks fetched successfully" });
        }
        const tasks = await Task.find({ user: user._id });
        res.status(200).json({ data: tasks, message: "Tasks fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getTasksById = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        if (user.isAdmin) {
            const task = await Task.findOne({ _id: id });
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ data: task, message: "Task fetched successfully" });
        }
        const task = await Task.findOne({ _id: id, user: user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ data: task, message: "Task fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTasksByUserId = async (req, res) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: "you dont have acess to do this task" });
        }
        const { id } = req.params;
        const tasks = await Task.find({ user: id });
        res.status(200).json({ data: tasks, message: "Tasks fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCollaborator = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { collaboratorId } = req.body;
        const task = await Task.findOne({ _id: id, user: user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.collaborators.push(collaboratorId);
        await task.save();
        res.status(200).json({ data: task, message: "Collaborator added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { createTask, deleteTask, getTasks, getTasksById, getTasksByUserId ,addCollaborator};