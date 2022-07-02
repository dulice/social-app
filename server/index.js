const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const postRoute = require("./routes/PostRoute");
const imageRoute = require("./routes/imageRoute");
const conversationRoute = require("./routes/ConversationRoute");
const messageRoute = require("./routes/MessagesRoute");
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

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
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log('running on port 5000')
});


io.on('connection', (socket) => {

    socket.on('join', (conversationId) => {
        socket.join(conversationId);
    });

    socket.on('chatInput', (chat) => {
        if(chat) {
            io.to(chat.conversationId).emit("chatResult", {message: chat.message, sender: chat.sender});
        }
    })
})

http.listen(server);

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
})
