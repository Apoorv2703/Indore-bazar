import Order from "../models/orderModel.js";
import Review from "../models/reviewModel.js"

const getReviews = async (req, res) => {

    const productId = req.pid
    console.log(productId);
    


    let reviews = await Review.find({ product: productId })

    if (!reviews) {
        res.status(404)
        throw new Error("Reviews Not Found")
    }

    res.status(200).json(reviews)

}


const addReview = async (req, res) => {
    let productId = req.pid
    let userId = req.user._id 

    let {rating , text} = req.body

    if(!rating || !text){
        res.status(409)
        throw new Error("Please fill all details");
        
    }

    //find if this product is in users order history

    let orderHistory = await Order.find({user : userId})

    let purchasedBefore 



orderHistory.forEach((orders=>{
    orders.products.forEach((order)=>{
        if(order.product.toString() === productId){
            purchasedBefore = true
            return 
        }
        

    })
}))

    
    

    

    let review = await Review.create({
        user : userId,
        product : productId ,
        rating : rating ,
        text : text ,
        isVerifiedBuyer : purchasedBefore  || false
    })

   res.status(201).json(review)




}

const removeReview = async (req, res) => {
   let reviewId = req.params.rid 

   await Review.findByIdAndDelete(reviewId)

   res.status(200).json({
    message : "Review Removed",
    _id : reviewId
   })
}


const reviewController = { getReviews, addReview, removeReview }

export default reviewController