import express from "express";
import userRouter from "./UserRouter/userRouter";
import ownerRouter from "./OwnerRouter/ownerRouter";
import barberRouter from "./BarberRouter/barberRouter";
const router = express.Router();
router.use("/user",userRouter);
router.use("/owner",ownerRouter);
router.use("/barber",barberRouter);

export default router;