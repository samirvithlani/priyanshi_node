const userController = require("../controllers/UserController")
const router = require("express").Router()

router.get("/users",userController.getAllUsers)
router.post("/user",userController.addUser)
module.exports  = router
