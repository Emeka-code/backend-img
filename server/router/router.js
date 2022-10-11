const upload= require("../Connect/Multer")

const express = require("express")
const router = express.Router()
const {getSingleUser,
    getAllUsers,
    createUser,
    deleteUser} =require("../controller/userController")

    router.route("/").get(getAllUsers);
    router.route("/:id").get(getSingleUser).delete(deleteUser)
    router.route("/register").post(upload,createUser)

    module.exports = router;