const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const path = require("path");
const app = express();
const session = require("express-session");
const nocache = require("nocache");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000;

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

// dbConnect();

app.use(logger("dev"));
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use("/uploads", express.static("uploads"));

//setting

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// app.set("views", [ 
//   path.join(__dirname, "views/user"),
//   path.join(__dirname, "views")
// ]);
app.set("views", path.join(__dirname, "views"));
// app.set('views', path.join(__dirname, "/views/admin")), 
// app.set('views', path.join(__dirname, "/views/users"));

app.use(
  session({ 
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

//for user Routes
app.use("/", userRoute);

//for admin Route
app.use("/admin", adminRoute);

//Server

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
