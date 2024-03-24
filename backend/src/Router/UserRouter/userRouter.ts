import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { client as clientModel } from '../../DataBase/db';

const userRouter = express.Router();

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  city: z.string()
});

userRouter.post("/signup-user", async (req: any, res: any) => {
  const reqUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    city: req.body.city,
  };

  try {
    const validationResult = userSchema.safeParse(reqUser);
    if (!validationResult.success) {
      return res.status(403).json({
        message: "Invalid Inputs or existing user"
      });
    }
  } catch (error) {
    console.error("Error while verifying:", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    const newUser = new clientModel(reqUser);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "SECRET_KEY");

    return res.json({
      message: "User Created Successfully",
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    return res.status(500).json({ message: "Error while creating user" });
  }
});

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

userRouter.post("/signin-user", async (req: any, res: any) => {
  const reqUser = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const validationResult = signInSchema.safeParse(reqUser);
    if (!validationResult.success) {
      return res.status(411).json({ message: "Invalid Input" });
    }
  } catch (error) {
    console.error("Error while verifying:", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    const user = await clientModel.findOne(reqUser);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");

    return res.json({
      message: "Signed In Successfully",
      token: token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error while signing in:", error);
    return res.status(500).json({ message: "Error while signing in" });
  }
});

export default userRouter;
