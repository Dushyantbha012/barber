import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { owner as ownerModel, barber } from "../../DataBase/db";
import auth from "../Middleware/auth";

const ownerRouter = express.Router();

const ownerSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
  shopname: z.string(),
  shopcity: z.string(),
  shopaddress: z.string(),
  homeservice: z.boolean(),
});

ownerRouter.post("/signup-owner", async (req: any, res: any) => {
  //params
  // name
  // email
  // username
  // password
  // shopname
  // shopcity
  // shopaddress
  // homeservice
  const reqOwner = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    shopname: req.body.shopname,
    shopcity: req.body.shopcity,
    shopaddress: req.body.shopaddress,
    homeservice: req.body.homeservice,
  };

  try {
    const validationResult = ownerSignupSchema.safeParse(reqOwner);
    if (!validationResult.success) {
      return res.status(403).json({
        message: "Invalid Inputs or existing owner",
        errors: validationResult.error.errors,
      });
    }
  } catch (error) {
    console.error("Error while verifying:", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    const newOwner = new ownerModel(reqOwner);
    await newOwner.save();
    const token = jwt.sign({ ownerId: newOwner._id }, "SECRET_KEY");
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
  //params
  //username
  //password
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

ownerRouter.get("/owner-details", auth, async (req, res) => {
  try {
    const ownerId = req.body.ownerId;
    const owner = ownerModel.findById(ownerId);
    res.json({
      name: owner.name,
      username: owner.username,
      email: owner.email,
      shopname: owner.shopname,
      shopcity: owner.shopcity,
      shopaddress: owner.shopaddress,
      homeservice: owner.homeservice,
      bookings: owner.bookings,
    });
  } catch (error) {
    res.status(411).json({ message: "error" });
  }
});
ownerRouter.post("/barbers", async (req, res) => {
  try {
    const name = req.body.name || "";
    const shopname = req.body.shopname || "";
    const shopcity = req.body.shopcity || "";
    const rate = req.body.rate || 0;
    const rated = req.body.rated || 5;
    type BarberQuery = {
      [key: string]:
        | { $regex?: string; $options?: "i" }
        | { $gte?: number }
        | { $lt?: number };
    };

    const query: BarberQuery = {};

    if (name !== "") {
      query.name = { $regex: name, $options: "i" };
    }

    if (shopname !== "") {
      query.shopname = { $regex: shopname, $options: "i" };
    }

    if (shopcity !== "") {
      query.shopcity = { $regex: shopcity, $options: "i" };
    }

    if (rated) {
      query.rating = { $gte: rated };
    }

    if (rate) {
      query.price = { $lt: rate };
    }

    const barbers = await barber.find(query);
    console.log("barbers found ", barbers);
    res.json({ barbers: barbers });
  } catch (err) {}
});
export default ownerRouter;
