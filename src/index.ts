import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import db from "./config/database";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoute);

async function dbConnect() {
  await db.authenticate();
  console.log("db connected");

  await db.sync({ force: true });

  console.log("table sync");
}

dbConnect();
app.listen(process.env.PORT, () => console.log("server running on 3000"));
