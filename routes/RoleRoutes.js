const router = require("express").Router()
const roleController = require("../controllers/RoleController")

router.get("/",roleController.getRoles)
router.post("/",roleController.addRole)
module.exports = router