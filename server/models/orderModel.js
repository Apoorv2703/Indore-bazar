import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
    user  : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" , 
        required : true
    } ,
     products : [
            {
                product : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Product",
                    required : true
                },
                qty : {
                    type : Number,
                    required : true ,
                    min : [1 , "Quantity cannot be less than 1"],
                    default : 1
                },
                
                _id : false
            }
        ],
    shop  : {
         type : mongoose.Schema.Types.ObjectId ,
        ref : "Shop" , 
        required : true
    },
    status : {
        type : String ,
        enum : ["Placed" , "Delivered" , "Dispatched" , "Cancelled"] , 
        required : true
    } ,
    isDiscounted : {
        type : Boolean ,
        required : true ,
        default : false
    },
    coupon : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Coupon",
        
    },
    totalBillAmount : {
        type : Number ,
        required : true
        
    }

} , {
    timestamps : true
})

let Order = mongoose.model("Order" , orderSchema)

export default Order