const roleModel = require("../models/RoleModel")

const addRole = async(req,res)=>{


    try{
        const savedRole = await roleModel.create(req.body)
        res.json({
            message:"role created..",
            data:savedRole
        })
    }catch(err){
        res.json({
            message:"error while creating role.."
        })
    }
}

const getRoles = async(req,res)=>{


    try{
        const roles = await roleModel.find()
        res.json({
            message:"role fetched...",
            data:roles
        })
    }catch(err){
        res.json({
            message:"error while getting role.."
        })
    }
}

module.exports={
    addRole,getRoles
}