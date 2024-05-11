const express = require("express");

const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const Database = require("./config/Database");
const PORT = process.env.PORT || 5000;
Database.connect();

app.use(express.json());
app.use(cookieParser());

const {cloudinaryconnect} = require("./config/Cloudinary")

// app.use(
//   cors({
//     origin: JSON.parse(process.env.CORS_ORIGIN),
//     credentials: true,
//     maxAge: 14400,
//   })
// );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

cloudinaryconnect();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
