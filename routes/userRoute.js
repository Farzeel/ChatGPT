import express from "express"
import { login, signUp,profile, logout } from "../controllers/userController.js"
import { authenticateUser } from "../middlewares/authmiddleware.js"

const router  = express.Router()

router.post("/signup" , signUp)
router.post("/signup" , login)
router.get("/profile" ,authenticateUser, profile)
router.post("/profile" ,authenticateUser, logout)

export default router