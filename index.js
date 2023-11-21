const express = require("express");
const {dbConnect} = require("./config/dbConnect")
const path = require('path')
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

// const bodyParser = require('body-parser');
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));


//for user Routes

const userRoute = require("./routes/userRoute");
// app.use("/user", userRoute);
app.use("/",userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
