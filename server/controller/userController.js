const userModel = require("../model/userModel")
const verifiedModel = require("../model/verifiedModel")
const nodemail = req("nodemailer")

const transport = nodemailer.createTransport({
    service:process.env.SERVICE,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS,
    }
})

const getAllUsers = async(req, res) =>{
    try {
        const allusers = await userModel.find();
        res.status(201).json({
            status: "all users gotten",
            data: allusers,
        })
    } catch (error) {
        res.status(404).json({ 
            message:err.message
        })
    }
}

const getSingleUser = async(req,res)=>{
    try {
        const singleUser = await userModel.findById(req.params.id);
        res.status(201).json({
          status: "singleUser gotten",
          data: singleUser,
        });
      } catch (error) {
        console.log(error.message);
      }
}

const deleteUser = async (req, res) => {
    try {
      const removeUSer = await userModel.findByIdAndDelete(req.params.id);
      res.status(204).json({
        data: removeUSer,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

const createUser = async(req, res) =>{
    try {
        const {email,userName,passWord} = req.body;
        const salt = await bcrypt.genSalt(process.env.Salt);
        const hashed = await bcrypt.hash(password,salt);
        const image = await cloudinary.uploader.upload(req.file.path);
        const user = await userModel.create({
            email,
            userName,
            password:hashed,
            avatar:image.secure_url,
            avatarID:image.public_id,
        })
        const mailOption = {
            from:"no-reply@gmail.com",
            to:email,
            subject:"Account Verification",
            html:`
            <h3>
            this is clinton pls send the money click the<a href="http://localhost:7777">link</a> to continue
            </h3> 
            `
        }

    } catch (error) {
        res.status(404).json({ 
            message:err.message
        })
    }
}

const verifyUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if(user){
            await userModel.findByIdAndUpdate(user_id{
                v
            })
        }else{
            res.status(404).json({
                message:"there is no user yet"
            })
        }
    } catch (error) {
        res.status(404).json({
            message:err.message
        })
    }
}


  module.exports = {
    getSingleUser,
    getAllUsers,
    createUser,
    deleteUser,
  };