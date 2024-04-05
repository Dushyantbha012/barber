import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import auth from "../Middleware/auth";
import { client, client as clientModel } from "../../DataBase/db";
import { owner as ownerModel } from "../../DataBase/db";
import { barber as barberModel } from "../../DataBase/db";

const userRouter = express.Router();

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  city: z.string(),
});

userRouter.post("/signup-user", async (req: any, res: any) => {
  //params
  // name
  // email
  // username
  // password
  // city
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
        message: "Invalid Inputs or existing user",
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
  //params
  //username
  //password
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
userRouter.post("/book-barber", async (req: any, res: any) => {
  //params for request
  // username
  // date
  // barberName
  // selectedSlotIndex

  //selectedSlotIndex => 0 == 9am-10am
  //selectedSlotIndex => 1 == 10am-11am
  //selectedSlotIndex => 2 == 11am-12pm
  try {
    const { username, date, barberName, selectedSlotIndex } = req.body;
    console.log("req is : ", { username, date, barberName, selectedSlotIndex });
    const user = await clientModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const barber = await barberModel.findOne({ name: barberName });
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    if (selectedSlotIndex < 0) {
      return res.status(400).json({ message: "Invalid time slot index" });
    }

    const selectedSlot = barber.timeSlots[selectedSlotIndex];
    if (!selectedSlot.isAvailable) {
      return res
        .status(409)
        .json({ message: "Selected time slot is not available" });
    }

    const newBooking = {
      date: new Date(date),
      barber: barberName,
      clientId: user._id,
      client: user.name,
    };

    user.bookings.push(newBooking);
    await user.save();

    barber.timeSlots[selectedSlotIndex].isAvailable = false;
    barber.bookings.push(newBooking);
    await barber.save();

    // const owner = await ownerModel.findOne({ name: barber.ownername });
    // if (!owner) {
    //   return res.status(404).json({ message: "Owner not found" });
    // }
    // owner.bookings.push(newBooking);
    // await owner.save();

    return res.json({
      message: "Booking added successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error while adding booking:", error);
    return res.status(500).json({ message: "Error while adding booking" });
  }
});

userRouter.post("/update-booking", auth, async (req: any, res: any) => {
  //things to complete : update booking in owner and barber db
  //params in request
  // username
  // date
  // barber
  // status
  try {
    const username = req.body.username;
    const user = await clientModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Client not found" });
    }
    const date = new Date(req.body.date);
    const barber = req.body.barber;
    const booking = user.bookings.find((booking: any) => {
      return (
        booking.date.toString() === date.toString() && booking.barber === barber
      );
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const bookingId = booking._id;
    const status = req.body.status;
    booking.completed = status;

    await user.save();
    return res
      .status(200)
      .json({ message: "Booking status updated successfully" });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
userRouter.post("/rate-barber", auth, async (req, res) => {
  //prams for request
  //barberUsername
  //rating
  //clientusername
  try {
    const { barberUsername, rating, clientUsername } = req.body;
    if (!barberUsername || !rating || !clientUsername) {
      return res.status(400).json({
        error: "BarberUsername, rating, and clientUsername are required.",
      });
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating must be a number between 1 and 5." });
    }
    const existingRating = await clientModel.findOne({
      username: clientUsername,
      "ratings.barberUsername": barberUsername,
    });
    if (existingRating) {
      return res
        .status(400)
        .json({ error: "You have already rated this barber." });
    }
    const foundBarber = await barberModel.findOne({ username: barberUsername });
    if (!foundBarber) {
      return res.status(404).json({ error: "Barber not found." });
    }
    foundBarber.rating =
      (foundBarber.rating * foundBarber.rated + rating) /
      (foundBarber.rated + 1);
    foundBarber.rated += 1;
    await foundBarber.save();
    await clientModel.updateOne(
      { username: clientUsername },
      { $push: { ratings: { barberUsername: barberUsername, rating: rating } } }
    );
    res.status(200).json({
      message: `Thank you for rating ${
        foundBarber.name
      }. New rating: ${foundBarber.rating.toFixed(2)}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

userRouter.get("/user-details", auth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await clientModel.findOne({ _id: userId });
    console.log(user);
    res.json({
      name: user.name,
      username: user.username,
      city: user.city,
      ratings: user.ratings,
      bookings: user.bookings,
      email: user.email,
    });
  } catch (error) {
    res.status(411).json({ message: "error" });
  }
});

userRouter.get("/user-bookings", auth, async (req, res) => {
  try {
    const uname = req.body.userId;
    const user = await clientModel.findById(uname);
    console.log(user);
    res.json({
      bookings: user.bookings,
    });
  } catch (error) {
    res.status(411).json({ message: "error" });
  }
});

export default userRouter;
