const cloudinary = require("cloudinary").v2;

const uploadToCloudinary =async (path)=>{

    cloudinary.config({
        api_key:"",
        api_secret:"",
        cloud_name:""
    })

    const res = await cloudinary.uploader.upload(path)

    return res
}
module.exports = uploadToCloudinary