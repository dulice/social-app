const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const postRoute = require("./routes/PostRoute");
const imageRoute = require("./routes/imageRoute");
const messageRoute = require("./routes/MessagesRoute");
const { createServer } = require('http');
const { Server } = require('socket.io');
const User = require("./models/UserModel");
const Message = require("./models/MessagesModel");
const Post = require("./models/PostModel");

dotenv.config();

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "*"
    }
});

//middleware
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('connect to db');
    })
    .catch((err) => {
        console.error(err.message)
    });

app.use("/api/upload", imageRoute);
app.use("/api/user", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log('running on port 5000')
});

const conversationMessage = async(conversationId) => {
    const message = await Message.aggregate([
        {$match: {conversationId}},
    ]);
    return message;
}

io.on('connection', (socket) => {

    socket.on('join', async(newRoom, previousRoom) => {
        socket.join(newRoom);
        socket.leave(previousRoom);
        const roomId = await conversationMessage(newRoom);
        socket.emit("room-messages", roomId);
    });

    socket.on('new-message', async(conversationId, sender, message) => {
        const newMessage = new Message({
            message,
            sender,
            conversationId
        });
        await newMessage.save();
        const roomId = await conversationMessage(conversationId);
        io.to(conversationId).emit("room-messages", roomId);
    });

    socket.on("like", async(postId, userId) => {
        const post = await Post.findById(postId);
        if(!post.likes.includes(userId)) {
            await post.updateOne({ $push: {likes: userId}});
        } else {
            await post.updateOne({ $pull: {likes: userId}});
        }    
        io.emit("likeUnlike", post);  
    })
})

http.listen(server);

const __variableOfChoice = path.resolve()
app.use(express.static(path.join(__variableOfChoice, '../client/build')));
app.get("*", (req,res) => {
    res.sendFile(path.join(__variableOfChoice, '../client/build/index.html'));
})

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
})
