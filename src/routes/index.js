import { Router } from "express";
import UserRoutes from "./user.routes.js"
import TaskRoutes from "./task.routes.js"


const router = Router();

router.use("/user", UserRoutes);
router.use("/task", TaskRoutes);


export default router;