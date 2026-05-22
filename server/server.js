import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import {connectDB} from "./config/dbconfig.js"
dotenv.config()

//local imports
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./Routes/authRoutes.js"
import adminRoutes from "./Routes/adminRoutes.js"
import shopOwnerRoutesRoutes from "./Routes/shopOwnerRoutes.js"
import productRoutes from "./Routes/productRoute.js"
import cartRoutes from "./Routes/cartRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"
import shopRoutes from "./Routes/shopRoutes.js"
import couponRoutes from "./Routes/couponRoutes.js"
import chatBotRoutes from "./Routes/chatBotRoutes.js"




let app = express()

let PORT = process.env.PORT || 5000

connectDB()

//body parser
app.use(express.json())
app.use(express.urlencoded())

app.get("/" , (req , res)=>{
    res.status(200)
    res.json({
        message : "WELCOME TO INDORE-BAZAR"
    })
})

//Auth Routes
app.use("/api/auth" , authRoutes)

//admin Routes

app.use("/api/admin" , adminRoutes)

//shopOwner Routes

app.use("/api/shop-owner" , shopOwnerRoutesRoutes)

//Product Routes

app.use("/api/products" , productRoutes)

//Cart Routes 

app.use("/api/cart" , cartRoutes )

//order Routes

app.use("/api/orders" , orderRoutes)

//shopRoutes
app.use("/api/shops" , shopRoutes)

//Coupon Routes
app.use("/api/coupons" , couponRoutes)

//chatBot Routes

app.use("/api/chat" , chatBotRoutes)



// error handler  
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black);

})

