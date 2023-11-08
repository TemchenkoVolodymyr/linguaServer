const express = require("express")

const mainChatRouter = express.Router()

const mainChatFunctions = require("../../Functions/MainChat/MainChatFunctions.cjs")

mainChatRouter.route('/create')

  .post(mainChatFunctions.createMainChat)

mainChatRouter.route('/chat/:firstMember/:secondMember')

  .get(mainChatFunctions.getMainChat)

mainChatRouter.route('/chats/dialogs/:idUser')
  .get(mainChatFunctions.getMainChats)

mainChatRouter.route('/chatById/:idChat')
  .get(mainChatFunctions.getMainChat)
  .patch(mainChatFunctions.addMessageToMainChat)

module.exports = mainChatRouter



