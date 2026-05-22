import mongoose from "mongoose";

let productSchema = new mongoose.Schema({

    name  : {
        type : String ,
        required : true
    } ,
    description : {
        type : String ,
        required: true
    } ,
    productImage : {
         type : String ,
        required: true
    },
    category : {
        type : String ,
        require : true
    },
    price : {
        type : Number ,
        require : true
    },
    stock : {
        type : Number ,
        require : true
    },
    shop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Shop",
        required : true
    }
   
}, {
    timestamps : true
})

let Product = mongoose.model("Product" , productSchema)

export default Product