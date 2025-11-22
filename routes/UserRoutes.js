const userController = require("../controllers/UserController")
const router = require("express").Router()

router.get("/users",userController.getAllUsers)
router.post("/user",userController.addUser)
router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
module.exports  = router
