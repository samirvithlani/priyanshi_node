const mongoose = require("mongoose")
const Schema  = mongoose.Schema

const roleModel = new Schema({

    name:{
        type:String,
        unique:true,
        required:true
    }
},{
    timestamps:true //createdAt,updatedAt
})

module.exports = mongoose.model("role",roleModel)