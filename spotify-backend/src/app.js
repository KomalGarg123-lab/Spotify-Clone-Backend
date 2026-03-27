const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");// Use cookie-parser middleware

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express(); 

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server 
    credentials: true, // allow cookies
  })
);

app.use(express.json());// we use this bcz we recieve json file from frontend we convert that file json to js object using this.
app.use(cookieParser());// 1. Unwrap cookies first

app.use("/api/auth", authRoutes);
app.use("/api", musicRoutes);

module.exports = app;