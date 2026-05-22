import express from "express"
import reviewController from "../controller/reviewController.js"
import protect from "../middleware/authMiddleware.js"

let router = express.Router()

router.get("/" , reviewController.getReviews)

router.post("/" ,protect.forAuthusers , reviewController.addReview)

router.delete("/:rid" , reviewController.removeReview)

export default router