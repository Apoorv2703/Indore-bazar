import multer from "multer"

let storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , "uploads/" )
    } ,
    filename : (req , file , cb)=>{
        cb(null, `product-${crypto.randomUUID()}.${file.originalname.split(".")[1]}`)
    }
})




let upload = multer({storage : storage})

export default upload