const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3000
const helmet = require("helmet");
const http = require('http')

const ErrorHandler = require("./server/APIFeatures/ErrorHandler.cjs");
const server = http.createServer(app);
const path = require('path')
// const dotenv = require('dotenv').config()
const authUsers = require('./server/Modules/AuthorizationModules.cjs')
app.use(helmet());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors({origin: "http://localhost:5173"}));
app.options("http://localhost:5173", cors());
app.use(express.json())
const {Server} = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
    allowedHeaders: ["lingua-header"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log(`User has connected ${socket.id}`)


// users
  socket.on('newUser', (userId) => {

    socket.userId = userId
    console.log(`socket user who has connected : ${socket.userId}`)
    authUsers.findByIdAndUpdate(userId, {online: true}, {new: true})
      .then(res => io.emit('newUser', res))
  })

  // messages
  socket.on("privateMessage", (id) => {
    io.emit("privateResponse", id)
  })

  //typing
  // socket.on("typing", (user) => {
  //   io.emit("userTyping", user)
  // })

  // disconnect  / set online false for  user who was log out
  socket.on("disconnect", () => {
    console.log(`User id who has left ${socket.userId}`)
    if (socket.userId) {
      authUsers.findByIdAndUpdate(socket.userId, {
        online: false
      }, {new: true}).then(res => io.emit('leftUser', res))
    }
  })
})

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection successful'));


/// routers

const languageRouter = require('./server/Routers/LanguageRouter.cjs');
const authRouter = require('./server/Routers/AuthorizationRouter.cjs');
const coursesRouter = require('./server/Routers/CoursesRouter.cjs');
const chatRouter = require('./server/Routers/ChatRouter.cjs');
const teacherChatRouter = require('./server/Routers/ChatWithTeachersRouter.cjs')
const onlineUsersRouter = require('./server/Routers/onlineUsersRouters.cjs')
const mainChatRouter = require('./server/Routers/MainChat/MainChatRouter.cjs')

app.use('/chat', chatRouter);
app.use('/languages', languageRouter);
app.use('/authorization', authRouter);
app.use('/courses', coursesRouter);
app.use('/teacherChats', teacherChatRouter);
app.use('/onlineUsers', onlineUsersRouter);
app.use('/mainChat', mainChatRouter);


app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`), 404);
})


server.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})
