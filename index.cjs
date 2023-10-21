const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const PORT = 3000
const helmet = require("helmet");
const http = require('http')

const ErrorHandler = require("./server/APIFeatures/ErrorHandler.cjs");
const server = http.createServer(app);
const path = require('path')

const authUsers = require('./server/Modules/AuthorizationModules.cjs')

// const {Server} = require('socket.io')

// const io = new Server(server, {
//   // cors: {
//   //   origin: "*",
//   //   secure: true,
//   //   headers: {"Content-Type": "application/json"},
//   //   methods: ["GET", "POST", "DELETE", "PATCH"]
//   // }
// });
const options = {cors:{
    origin: "*",
    // secure: true,
    headers: {"Content-Type": "application/json"},
    methods: ["GET", "POST", "DELETE", "PATCH"]
  }};
const io = require("socket.io")(server,options)

// working with socket

const users = []
const connections = []

io.on("connection", socket => {
  console.log('Success')
  connections.push(socket);

  socket.on("disconnect", (data) => {
    connections.slice(connections.indexOf(socket), 1) // delete socket when disconnect
    console.log('Disconnect')
  })
// console.log('connect')
//   socket.emit('message', 'Welcome to chat')
//
//   // Broadcast when a user  connects
//   socket.broadcast.emit("message",'A user has joined the chat');
//
//   // Runs when client disconnect
//
//   socket.on("disconnect",() => {
//     io.emit('message','A use has left the chat')
//
//   })
//
//   socket.on('sendMessage',(msg) => {
//     console.log(msg)
//   })
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(express.json())

mongoose.connect("mongodb+srv://temcenkovova8:brFMAZAjzkX4ighR@cluster0.4dgfzzn.mongodb.net/LinguaSwap?retryWrites=true&w=majority", {
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


// io.on("connection", (socket) => {
//
//   // socket.emit("connected", socket.id)
//   //  users
//   // authUsers.find({online: true}).then(users => {
//   //
//   //   socket.emit("onlineUsers", users)
//   // });
//
//   socket.on("privateMessage", (id) => {
//     socket.emit("privateResponse", id)
//   })
//
// // users
//   socket.on('newUser', (userId) => {
//     console.log('t')
//     socket.userId = userId
//     authUsers.findByIdAndUpdate(userId, {online: true}, {new: true}).then(user => {
//       socket.emit("connected", user);
//     })
//   })
//
//   //typing
//   socket.on("typing", (user) => {
//     io.emit("userTyping", user)
//   })
//
//   // disconnect  / set online false for  user who was log out
//   socket.on("disconnect", () => {
//
//     if (socket.userId) {
//       authUsers.findByIdAndUpdate(socket.userId, {
//         online: false
//       }, {new: true}).then(user => {
//
//         io.emit("userDisconnected", socket.userId)
//       })
//     }
//   })
// })