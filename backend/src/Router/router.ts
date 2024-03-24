const express = require("express")
const router = express.Router();
router.use("/user",userRouter);
router.use("/owner",ownerRouter);
router.use("/barber",barberRouter);