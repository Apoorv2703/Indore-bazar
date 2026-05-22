import jwt from "jsonwebtoken"
import User from "../models/userModal.js"


let forAuthusers = async (req, res, next) => {

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decoded.id).select("-password")
            if (!user) {
                res.status(400)
                throw new Error("You are not  authorised no user");

            }

            req.user = user
            next()


        }else{
              res.status(400)
        throw new Error("You are not  authorised . No token found");
        }

    } catch (error) {
        res.status(400)
        throw new Error("You are not  authorised");

    }

}


let forAdmin = async (req, res, next) => {

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decoded.id).select("-password")
            if (!user) {
                res.status(400)
                throw new Error("You are not  authorised");

            }

            if(user.isAdmin){
                req.user = user
                next()
            }else{
                 res.status(400)
                throw new Error("You are not  authorised : Admin can access only");

            }


        }

    } catch (error) {
        res.status(400)
        throw new Error("You are not  authorised");

    }

}

let protect = {forAuthusers , forAdmin}

export default protect

