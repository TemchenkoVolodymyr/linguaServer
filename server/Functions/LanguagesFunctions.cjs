
const Language = require('../Modules/LanguagesModule.cjs')
const {catchAsyncError} = require("../errorControllers/CatchAsyncError.cjs");

exports.getLanguages = catchAsyncError(async (req,res) => {

  const languages = await Language.find()

    res.status(200).json({
      status:'succeed',
      languages
    })
})
exports.createLanguage =  catchAsyncError(async (req,res) => {

  const {language,numberOTeachers} = req.body

  const createLanguage = await Language.create({
    language ,numberOTeachers
  })

    const response = await createLanguage.save()
    res.status(200).json({
      status:"Succeed",
      response
    })
})

