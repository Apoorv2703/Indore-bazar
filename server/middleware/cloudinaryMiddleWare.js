import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs"
import dotenv from "dotenv"


dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: 'dwft2ydjy',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

let uploadToCloudinary = async (fileLink) =>{

    try {
        let response = await cloudinary.uploader.upload(fileLink , {
            resource_type : "auto",
        })
        return response
        
    } catch (error) {
        fs.unlinkSync(fileLink)
        console.log(error.message);
        
        
        
    }

}

export default uploadToCloudinary

// async function uploadToCloudinary(fileLink) {



//     // Upload an image

//     try {
//         const uploadResult = await cloudinary.uploader
//             .upload(
//                 fileLink, {
//                 resource_type: "auto",
//             }

//             )
//         console.log(uploadResult);
//         return uploadResult

//     } catch (error) {
//         console.log(error.message);


//     }





// };

