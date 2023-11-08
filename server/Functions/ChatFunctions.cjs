const Chats = require('./../Modules/Chat.cjs');
const {catchAsyncError} = require("../errorControllers/CatchAsyncError.cjs");

exports.createChat = catchAsyncError(async (req, res) => {

   const newChat = await Chats.create({
      idCourse: req.body.idCourse,
   })
      res.status(200).json({
         status: 'Success',
         newChat: newChat,
      })

})

exports.getChat = catchAsyncError(async (req, res) => {

   const {idCourse} = req.params

   const chatRoom = await Chats.findOne({"idCourse": idCourse})

      res.status(200).json({
         status: "Succeed",
         chatRoom
      })

})

exports.addMessage = catchAsyncError(async (req, res) => {

   const {idCourse} = req.params


   const message = await Chats.findByIdAndUpdate(idCourse,
      {$addToSet: {"messages": {$each: [req.body]}}}
   )

      res.status(200).json({
         status: "Succeed",
         message
      })

})