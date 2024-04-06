import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import auth from "../Middleware/auth";
import { barber as barberModel } from "../../DataBase/db";
import { owner as ownerModel } from "../../DataBase/db";
const barberRouter = express.Router();

const barberSchema = z.object({
  name: z.string(),
  email :z.string().email(),
  ownerUsername: z.string(),
  username: z.string(),
  password: z.string(),
  rate: z.number(),
});

barberRouter.post("/signup-barber", async (req: any, res: any) => {
  //params
  //name
  //ownername
  //username
  //password
  //rate
  console.log("request is :",req)
  const reqBarb = {
    name: req.body.name,
    ownerUsername: req.body.ownerUsername,
    email:req.body.email,
    username: req.body.username,
    password: req.body.password,
    rate: req.body.rate,
  };

  try {
    const validationResult = barberSchema.safeParse(reqBarb);
    console.log("here")
    console.log("request")
    if (!validationResult.success) {
      return res.status(403).json({
        message: "Invalid Inputs or Existing User",
      });
    }
  } catch (error) {
    console.error("Error while verifying: ", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    const newBarb = new barberModel(reqBarb);
    await newBarb.save();

    const token = jwt.sign({ barberId: newBarb._id }, "SECRET_KEY");

    await ownerModel.updateOne(
      { name: reqBarb.ownerUsername },
      { $push: { barbers: { barberName: reqBarb.name } } }
    );

    return res.json({
      message: "Barber Created Successfully",
      token: token,
      BarbId: newBarb._id,
    });
  } catch (error) {
    console.error("Error while creating barber : ", error);
    return res.status(500).json({ message: "Error while creating barber " });
  }
});

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

barberRouter.post("/signin-barber", async (req: any, res: any) => {
  //params
  //username
  //password
  const reqBarb = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const validationResult = signInSchema.safeParse(reqBarb);
    if (!validationResult.success) {
      return res.status(411).json({ message: "Invalid Input" });
    }
  } catch (error) {
    console.error("Error while verifying : ", error);
    return res.status(500).json({ message: "Error while verifying" });
  }

  try {
    const barb = await barberModel.findOne(reqBarb);
    if (!barb) {
      return res.status(404).json({ message: "Barber Doesn't Exist" });
    }

    const token = jwt.sign({ barberId: barb._id }, "SECRET_KEY");

    return res.json({
      message: "Signed In Successfully",
      token: token,
      barberId: barb._id,
    });
  } catch (error) {
    console.error("Error while signin in : ", error);
    return res.status(500).json({ message: "Error while signing in " });
  }
});

barberRouter.get("/barber-details", auth, async (req, res) => {
  try {
    const barberId = req.body.barberId;
    const barber = barberModel.findById(barberId);
    res.json({
      name: barber.name,
      username: barber.username,
      ownername: barber.ownername,
      rate: barber.rate,
      ratings: barber.ratings,
      rated: barber.rated,
      bookings: barber.bookings,
      available: barber.available,
    });
  } catch (error) {
    res.status(411).json({ message: "error" });
  }
});

export default barberRouter;
