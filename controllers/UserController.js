const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt")
//require.. mailUril
//update
const getAllUsers = async (req, res) => {
  //const users = await userModel.find(); //[]
  //const users = await userModel.find().populate("roleId"); //[]
  const users = await userModel.find().populate("roleId","name"); //[]
  if (users && users.length > 0) {
    res.status(200).json({
      message: "user found..",
      data: users,
    });
  } else {
    res.status(404).json({
      message: "no user found ",
    });
  }
};

//req.body..
const addUser = async (req, res) => {
  try {
    //password... encrypt
    const hashedPassword = bcrypt.hashSync(req.body.password,12)
    //const savedUser = await userModel.create(req.body);
    const savedUser = await userModel.create({...req.body,password:hashedPassword});
    //savedUser.email 
    //sendMail(savedUser.email,"","")
    res.status(201).json({
      message: "user created successfully!!",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while saving user",
      err: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted successfully!!",
      });
    } else {
      res.status(404).json({
        message: "user not found to  delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while delete user",
      err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if (updatedUser) {
      res.status(200).json({
        message: "update user sucess",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "error while update user user not found..",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while update user",
      err,
    });
  }
};

//if hobby is present it should  not add..
//$Pull check if hobby is avaialble then remove..
const addHobby = async(req,res)=>{
  const id = req.params.id;
  const hobby = req.body.hobby;

  try{

    const updatedUser = await userModel.findByIdAndUpdate(id,{$push:{hobbies:hobby}},{new:true})
    res.status(201).json({
      message:"new hobby added..",
      data:updatedUser
    })



  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"error while adding hobby",
      err:err
    })
  }


}

const loginUser = async(req,res)=>{
  //email ,password 
  const userFromEmail = await userModel.findOne({email:req.body.email})
  //db -->user --> password --> encrypted
  if(userFromEmail){

    if(bcrypt.compareSync(req.body.password,userFromEmail.password)){
      res.json({
        message:"login success",
        data:userFromEmail
      })
    }
    else{
      res.json({
        message:"invalid credentials",
      })
    } 

  }
  else{
    res.json({
      message:"user not found signup first.."
    })
  }

}
module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  addHobby,
  loginUser
};
