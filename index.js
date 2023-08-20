import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // await db.sync(); //untuk jika tidak ada tabel maka akan menggenerate tabel otomatis
  // await Users.sync(); //jika sudah ada tabel tidak perlu digunakan
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server runninng at port 5000"));
