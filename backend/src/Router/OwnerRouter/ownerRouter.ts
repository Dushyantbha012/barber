import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { owner as ownerModel } from '../../DataBase/db';

const ownerRouter = express.Router();

const ownerSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
  shopname: z.string(),
  shopcity: z.string(),
  shopaddress: z.string(),
  homeservice : z.boolean()
});

ownerRouter.post("/signup-owner", async (req: any, res: any) => {
  const reqOwner = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    shopname: req.body.shopname,
    shopcity: req.body.shopcity,
    shopaddress: req.body.shopaddress,
    homeservice : req.body.homeservice
  };

  try {
    // Validate the request body against the schema
    const validationResult = ownerSignupSchema.safeParse(reqOwner);
    if (!validationResult.success) {
      return res.status(403).json({
        message: "Invalid Inputs or existing owner",
        errors: validationResult.error.errors
      });
    }
  } catch (error) {
    console.error("Error while verifying:", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    // Create a new owner instance using the request data
    const newOwner = new ownerModel(reqOwner);
    // Save the new owner to the database
    await newOwner.save();

    // Generate JWT token
    const token = jwt.sign({ ownerId: newOwner._id }, "SECRET_KEY");

    // Send success response
    return res.json({
      message: "Owner Created Successfully",
      token: token,
      ownerId: newOwner._id,
    });
  } catch (error) {
    console.error("Error while creating owner:", error);
    return res.status(500).json({ message: "Error while creating owner" });
  }
});
const signInSchema = z.object({
    username: z.string(),
    password: z.string(),
});

ownerRouter.post("/signin-owner", async (req: any, res: any) => {
    const reqOwner = {
        username: req.body.username,
        password: req.body.password,
    };
    const { success } = signInSchema.safeParse(reqOwner);
    if (!success) {
        return res.status(411).json({ message: "Invalid Input" });
    }
    try {
        const Owner = await ownerModel.findOne(reqOwner);
        if (!Owner) {
            return res.status(404).json({ message: "Owner doesn't exist" });
        }
        const token = jwt.sign({ ownerId: Owner._id }, "SECRET_KEY");
        res.json({
            message: "Signed In Successfully",
            token: token,
            ownerId: Owner._id,
        });
    } catch (error) {
        console.error("Error while signing in:", error);
        return res.status(500).json({ message: "Error while signing in" });
    }
});

export default ownerRouter;
