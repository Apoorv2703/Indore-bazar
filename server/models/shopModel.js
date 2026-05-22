import mongoose from "mongoose";

let shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true,
    },
    shopPhone: {
        type: Number,
        require: true,
        unique: true
    },
    status: {
        type: String,
        enum : ["pending" , "accepted" , "rejected"],
        default : "pending",
        required: true,
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
})

let Shop = mongoose.model("Shop", shopSchema)

export default Shop