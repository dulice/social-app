const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const postRoute = require("./routes/PostRoute");
const imageRoute = require("./routes/imageRoute");
const chatRoute = require("./routes/chatRoute");

dotenv.config();

const app = express();

//middleware
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cors());

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('connect to db');
    })
    .catch((err) => {
        console.log(err.message)
    });

app.use("/api/upload", imageRoute);
app.use("/api/user", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log('running on port 5000')
});
