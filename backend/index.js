const express = require("express");
const app = express();

const contactusRoutes = require("./routes/Contactus")
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
// const profileRoutes = require("./routes/Profile");
// const courseRoutes = require("./routes/Course");

const Database = require("./config/Database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const {cloudinaryconnect} = require("./config/Cloudinary")

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
Database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN),
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryconnect();

app.use("/api/auth",userRoutes);
app.use("/api/contact",contactusRoutes);
app.use("/api/payment",paymentRoutes);
// app.use("/api/course",courseRoutes);
// app.use("/api/profile",profileRoutes);

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to API",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

