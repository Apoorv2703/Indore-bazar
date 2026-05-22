import User from "../models/userModal.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

let registerUser = async(req , res) =>{

    let {name ,email , phone , password , address} = req.body

    if(!name || !email || !phone || !password || !address){
        res.status(409)
        throw new Error("Please Fill All Details");
        
    }

    let emailExist = await User.findOne({email})
    let phoneExist = await User.findOne({phone})

    if(emailExist || phoneExist){
        res.status(409)
        throw new Error("User already Exist");
        
    }

    // validate Phone number

    if(phone.length !== 10 ){
        res.status(409)
        throw new Error("Please Enter Valid Phone.No");
        

    }

    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password , salt)


    //create User
    let user = await User.create({
        name , email , password : hashedPassword , phone , address
    })
   
    if(!user){
        res.status(409)
        throw new Error("User Not Created");
        
    }

    res.status(201)
    res.json({
       _id :  user._id,
       name : user.name,
       email : user.email,
       phone : user.phone,
       address : user.address,
       isAdmin : user.isAdmin,
       isShopOwner : user.isShopOwner,
       isActive : user.isActive,
       token : generateToken(user._id)  
    })


}

let loginUser = async(req  , res) =>{
    let {email , password} = req.body
    
    if(!email || !password){
        res.status(409)
        throw new Error("Please Fill All Details");
        
    }

    // Find User

    let user = await User.findOne({email})

    //check Password
    if(user && await bcrypt.compare(password , user.password)){
        res.status(200)
        res.json({
             _id :  user._id,
       name : user.name,
       email : user.email,
       phone : user.phone,
       address : user.address,
       isAdmin : user.isAdmin,
       isShopOwner : user.isShopOwner,
       isActive : user.isActive,
       token : generateToken(user._id) 


        })

    }else{
        res.status(400)
        throw new Error("Invalid Credentials");
        
    }
       
}

//private controller

let privateAccess = (req , res)=>{
   res.json({
    message : `request is made by : ${req?.user.name }`
   })
}

//Generate Token

 let generateToken = (id) =>{
    let token = jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'})
    return token
 }

let authController = {
    registerUser ,
    loginUser,
    privateAccess
}

export default authController
