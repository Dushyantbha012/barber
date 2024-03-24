const ownerRouter = express.Router();
const {owner : ownerModel} = require('../../DataBase/db')
ownerRouter.post("/signup-owner",async(req :any,res :any)=>{
    const reqOwner = {
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        shopname : req.body.shopname,
        shopcity : req.body.shopcity,
        shopaddress : req.body.shopaddress,
        homeservice : req.body.homeservice,
    };
    try{
        console.log("request reached backend");
        const {success}= ownerModel.safeParse(reqOwner);
        if(!success){
            return res.status(403).json({
                message: "Invalid Inputs or existing owner"
            })
        }
    }
    catch {
        return res.status(403).json({ message: "Error while verifrying" })
    }
    const Owner = await ownerModel.create(reqOwner);
    const token = jwt.sign({ ownerId: Owner._id }, "SECRET_KEY");
    res.json({
        message: "Owner Created Successfully !!!!",
        token: token,
        owner: Owner._id,
    });
})

ownerRouter.post("/signin-owner", async(req:any, res:any)=>{
    const reqOwner = {
        username: req.body.username,
        password: req.body.password,
      };
      const { success } = signInSchema.safeParse(reqOwner);
      if (!success) {
        return res.status(411).json({ message: "Invalid Input" });
      }
      const Owner = await ownerModel.findOne(reqOwner);
      if (!Owner) {
        return res.status(404).json({ message: "Sign Up|| Owner doesn't exist" });
      }
      const token = jwt.sign({ OwnerId: Owner._id }, "SECRET_KEY");
    res.json({
      message: "Signed In Successfully !!!!",
      token: token,
      ownerId: Owner._id,
    });
    return;
});

module.exports = ownerRouter;