import { Router } from "express";

import { register, login } from "../controllers/user.controller.js";
import {AuthProtect} from "../middleware/auth.middlerware.js";

const router = Router();


router.post("/register",AuthProtect, register);
router.post("/login", login);


export default router;