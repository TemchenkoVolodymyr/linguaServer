const ChatWithTeacher = require('../Modules/ChatWithTeachersModels.cjs')
const {catchAsyncError} = require("../errorControllers/CatchAsyncError.cjs");

exports.createChatTeacher = catchAsyncError(async (req, res) => {

  const newChat = await ChatWithTeacher.create({
    idTeacher: req.body.idTeacher,
    idStudent: req.body.idStudent,
    messages: []
  })
  res.status(200).json({
    status: "Success",
    newChat
  })
})

exports.getChatTeacher = catchAsyncError(async (req, res) => {

  const {idTeacher, idStudent} = req.params

  const findChatTeacher = await ChatWithTeacher.findOne({"idTeacher": idTeacher, "idStudent": idStudent})

  res.status(200).json({
    status: "Success",
    findChatTeacher
  })
})

exports.getChatsTeacher = catchAsyncError(async (req, res) => {

  const {idStudent} = req.params

  const findChats = await ChatWithTeacher.find({"idStudent": idStudent})

    res.status(200).json({
      status: "Success",
      results: findChats.length,
      findChats
    })

})

exports.getChatsStudents = catchAsyncError(async (req, res) => {
  const {idTeacher} = req.params
  const findChats = await ChatWithTeacher.find({"idTeacher": idTeacher})

    res.status(200).json({
      status: "Success",
      results: findChats.length,
      findChats
    })

})

exports.addMessageToChat = catchAsyncError(async (req, res) => {

  const {idChat} = req.params
  const message = await ChatWithTeacher.findByIdAndUpdate(idChat,
    {$addToSet: {"messages": {$each: [req.body]}}})

    res.status(200).json({
      status: "Succeed",
      message
    })

})

