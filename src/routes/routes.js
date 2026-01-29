import express from "express"
import { registerUser, loginUser } from "../controllers/authController.js"
import {createTask, getTasks,deleteTask,updateTask} from "../controllers/taskController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)


router.post("/tasks", protect, createTask)
router.get("/tasks", protect, getTasks)
router.delete("/tasks/:id", protect, deleteTask)
router.put("/tasks/:id", protect, updateTask)

export default router;
