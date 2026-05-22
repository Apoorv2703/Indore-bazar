import Shop from "../models/shopModel.js"

let getShops = async(req , res)=>{
    let shops = await Shop.find()

    if(!shops){
        res.status(404)
        throw new Error("Shops Not Found");  
    }

    let activeShops = shops.filter(shop => shop.status === "accepted")

    res.status(200)
    res.json(shops)
}

let getShop = async(req , res)=>{
    let shop = await Shop.findById(req.params.sid)

    if(!shop){
        res.status(404)
        throw new Error("Shop Not Found");
        
    }

    res.status(200)
    res.json(shop)

}

let shopController = { getShops , getShop}

export default shopController