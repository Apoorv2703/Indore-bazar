import express from "express"
import protect from "../middleware/authMiddleware.js"
import { getAnswer } from "../controller/chatBotController.js"

let router = express.Router()

router.post('/' , protect.forAuthusers , getAnswer)



export default router