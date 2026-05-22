import Product from "../models/productModel.js"

let getProducts = async(req , res)=>{
    let products = await Product.find().populate("shop")

    if(!products){
        res.status(404)
        throw new Error("Products Not Found");
    }
    res.status(200).json(products)
}

let getProduct = async(req ,res)=>{
    let product = await Product.findById(req.params.pid).populate("shop")

    if(!product){
        res.status(404)
        throw new Error("Product Not Found");
    }
    res.status(200).json(product)
}


let searchProduct = async(req ,res)=>{
    res.send("searched Products")
}

let productController = {getProducts , getProduct , searchProduct}

export default productController