import mongoose from "mongoose";

export  let connectDB = async()=>{
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connection Success : ${conn.connection.name}`.bgGreen.black);
        
        
    } catch (error) {
        console.log(`DB Connection failed : ${error.message}`.bgRed.white);
        
        
    }
}

