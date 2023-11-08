const OnlineUsers = require('../Modules/onlineUsersModules.cjs')
const {catchAsyncError} = require("../errorControllers/CatchAsyncError.cjs");

exports.getOnlineUsers = catchAsyncError(async (req, res) => {

  let filter = {}
  if (req.params.online === true) {
    filter = {
      online: true
    }
  }
  const users = await OnlineUsers.find({filter})
  res.status(200).json({
    status: "Succeed",
    users
  })
})

exports.addOnlineUsers = catchAsyncError(async (req, res) => {

  const users = await OnlineUsers.create(req.body)

    res.status(200).json({
      status: "Succeed",
      users
    })
})

exports.removeOnlineUser = catchAsyncError(async (req, res) => {

  const users = await OnlineUsers.deleteOne({socketId: req.body.socketId})

  res.status(200).json({
    status: "user was removed",
    users
  })

})