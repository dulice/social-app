const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const postRoute = require("./routes/PostRoute");
const imageRoute = require("./routes/imageRoute");

dotenv.config();

const app = express();

//middleware
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cors());

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(5000);
        console.log('connect to db');
    })
    .catch((err) => {
        console.log(err.message)
    });

app.use("/api/upload", imageRoute);
app.use("/api/user", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
