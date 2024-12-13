import { Router } from "express";   
import { createTask, deleteTask, getTasks, getTasksById, getTasksByUserId,addCollaborator } from "../controllers/task.controller.js";
import { AuthProtect } from "../middleware/auth.middlerware.js";
const router = Router();


router.post("/create", AuthProtect, createTask);
router.get("/", AuthProtect, getTasks);
router.get("/:id", AuthProtect, getTasksById);
router.get("/user/:id", AuthProtect, getTasksByUserId);
router.delete("/:id", AuthProtect, deleteTask);
router.put("/collaborator/:id", AuthProtect, addCollaborator);

export default router;
