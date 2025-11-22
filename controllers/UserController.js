const userModel = require("../models/UserModel")

const getAllUsers = async(req,res)=>{

        const users =await userModel.find() //[]
        if(users && users.length>0){
            res.status(200).json({
                message:"user found..",
                data:users
            })
        }
        else{
            res.status(404).json({
                message:"no user found "
            })
        }

}

//req.body..
const addUser = async(req,res)=>{

    try{
    const savedUser = await userModel.create(req.body)
    res.status(201).json({
        message:"user created successfully!!",
        data:savedUser
    })
    }catch(err){

        res.status(500).json({
            message:"error while saving user",
            err:err
        })
    }



}
module.exports={
    getAllUsers,
    addUser
}