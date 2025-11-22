const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userModel = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    age:{
        type:Number
    },
    password:{
        type:String
    },
    hobbies:[{
        type:String
    }],
    bloodGroup:{
        enum:["A+","A-","B+","B-"],
        type:String
    }

})
module.exports = mongoose.model("users",userModel)