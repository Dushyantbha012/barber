import express from "express";
import router from "./Router/router";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
    console.log("Server Running on ", 3000);
  });
