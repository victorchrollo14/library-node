import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import logger from "morgan";
import {} from "dotenv/config";
import { libraryRouter } from "./src/routes/library.js";
import { loginRouter } from "./src/routes/login.js";
import { regRouter } from "./src/routes/register.js";
import { dataRouter } from "./src/routes/data.js";
import mongoose from "mongoose";

const PORT = 3000;
const app = express();

app.use(logger("dev")); // global middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "src", "public")));

// template engines
app.set("views", join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routers
app.use("/", libraryRouter);
app.use("/login", loginRouter);
app.use("/register", regRouter);
app.use("/get-data", dataRouter);

const runserver = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb library database...");

    app.listen(PORT, () => {
      console.log(`Library is running, server listening to ${PORT}`);
    });
  } catch (err) {
    console.log("Error Message: ", err);
  }
};

runserver();

/* 
TASKS
    DONE 😃
      ✅  Routing 
      ✅  Template Engine and serving Static files
      ✅  Setting up database models
      ✅  Create and Read Operations
      ✅  Environment variables with dotenv
      ✅  Delete and Update Operation

    TO-DO ⛳
      🌟 Authentication and Authorization
      🌟 Genre Models and UserModels
      🌟 Using Extenal API's
      🌟 Deployement
      
*/
