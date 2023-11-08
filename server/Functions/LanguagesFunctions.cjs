
const Language = require('../Modules/LanguagesModule.cjs')

exports.getLanguages = async (req,res) => {

  const languages = await Language.find()

  if(languages) {
    res.status(200).json({
      status:'succeed',
      languages
    })
  }else{
    res.status(400).json({
      status:'Clear',
      message:"Document is clear"
    })
  }
}
const catchAsyncError = fn => {
  return (req,res,next) => {
    fn(req,res,next).catch(next)
  };
};
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

