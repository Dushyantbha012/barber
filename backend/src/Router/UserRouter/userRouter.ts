const userRouter = express.Router();
const { z } = require("zod");
const {client : clientModel}=require('../../DataBase/db')
const user = z.object({
    name: z.string(),
    email: z.string(),
    username: z.string(),
    password: z.string(),
    city: z.string()
})

userRouter.post("/signup-user", async (req: any, res: any) => {
    const reqUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        city: req.body.city,
    };
    try {
        console.log("Request reached to backend");
        const { success } = clientModel.safeParse(reqUser);
        if (!success) {
            return res.status(403).json({
                message: "Invalid Inputs or existing user"
            })
        }
    }
    catch {
        return res.status(403).json({ message: "Error while verifrying" })
    }
    //didn't add existing check coz username is unique, if existing user then mongo takes care
    const user = await clientModel.create(reqUser);
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
    res.json({
        message: "User Created Successfully !!!!",
        token: token,
        userId: user._id,
    });
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string(),
});

userRouter.post("/signin-user", async (req : any, res :any) => {
    const reqUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const { success } = signInSchema.safeParse(reqUser);
    if (!success) {
      return res.status(411).json({ message: "Invalid Input" });
    }
    const user = await clientModel.findOne(reqUser);
    if (!user) {
      return res.status(404).json({ message: "Sign Up|| User doesn't exist" });
    }
  
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
    res.json({
      message: "Signed In Successfully !!!!",
      token: token,
      userId: user._id,
    });
    return;
  });
module.exports = userRouter;
