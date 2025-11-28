const express  = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json()) // global middelware to accept json data..

//require routes

const userRoutes = require("./routes/UserRoutes")
//http:localhost:3000/user/users
app.use("/user",userRoutes)


const roleROutes = require("./routes/RoleRoutes")
app.use("/role",roleROutes)








mongoose.connect("mongodb://127.0.0.1:27017/priyanshi_backup").then((data)=>{
    console.log("datbase connected successfully !!")
})
const PORT=3000
app.listen(PORT,()=>{
    console.log(`server started on port no ${PORT}`)
})