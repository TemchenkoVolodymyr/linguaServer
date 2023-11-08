const MainChat = require('../../Modules/MainChat/MainChatModules.cjs')
const {catchAsyncError} = require("../../errorControllers/CatchAsyncError.cjs");

exports.createMainChat = catchAsyncError(async (req, res) => {

  const chat = await MainChat.create({
    members: req.body.members,
    messages: [],
    createDate: new Date(),
  })

    res.status(200).json({
      status: "Created",
      chat
    })

})

exports.getMainChat = catchAsyncError(async (req, res) => {

  const {firstMember, secondMember} = req.params
  const query = !req.params.idChat ? {
      $or: [
        {"members.first": firstMember, "members.second": secondMember},
        {"members.first": secondMember, "members.second": firstMember},
      ],
    }
    : {_id: req.params.idChat};

  const foundChat = await MainChat.findOne(query)
    res.status(200).json({
      status: "Success",
      foundChat
    })
})

exports.getMainChats = catchAsyncError(async (req, res) => {

  const {idUser} = req.params
//                                  $or its || in JS

  const foundChats = await MainChat.find({
    $or: [
      {"members.first": idUser},
      {"members.second": idUser}
    ]
  })
    res.status(200).json({
      status: "Succeed",
      foundChats
    })

})

exports.addMessageToMainChat = catchAsyncError(async (req,res) => {

  const {idChat} = req.params
  const addedMessage = await MainChat.findByIdAndUpdate(idChat,{$addToSet:{"messages":{$each:[req.body]}}})

    res.status(200).json({
      status:"Succeed",
      addedMessage
    })

})