import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { globalLimit } from "./middleware/limiter.js";
import posts from "./routes/posts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
// app.use(cookieParser);
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "render link" // add the server link here when you publish it
//         : "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(globalLimit);

app.use("/api/posts", posts)

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to mongoDB... ✅"))
  .catch(() => console.log("Error connecting to mongoDB... ❌", err.message));

app.listen(port, () => {
  console.log(`Server running on port ${port} 🌍`);
});