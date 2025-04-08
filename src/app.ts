import express from "express";
import router from "./routes/product";
import { prisma } from "./models/client";

const app = express();

app.use("/api/v1", router);

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
