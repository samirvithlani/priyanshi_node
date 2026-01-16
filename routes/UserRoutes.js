const userController = require("../controllers/UserController")
const router = require("express").Router()
//require middleware
const testMiddleware = require("../middleware/TestMiddleware")
const zodMiddleware = require("../middleware/ZodMiddleware")
const userValidationSchema = require("../validationschema/UserValidationSchema")

//router.get("/users",userController.getAllUsers)
router.get("/users",testMiddleware.testing,userController.getAllUsers)
router.post("/user",zodMiddleware(userValidationSchema),userController.addUser)
router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/user/addhobby/:id",userController.addHobby)
router.post("/loginuser",userController.loginUser)
module.exports  = router
