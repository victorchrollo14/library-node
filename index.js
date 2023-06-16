import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import logger from "morgan";
import { libraryRouter } from "./src/routes/library.js";
import { loginRouter } from "./src/routes/login.js";
import { regRouter } from "./src/routes/register.js";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

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

const runserver = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Library is running, server listening to ${PORT}`);
    });
  } catch (err) {
    console.log("Error Message: ", err);
  }
};

runserver();
