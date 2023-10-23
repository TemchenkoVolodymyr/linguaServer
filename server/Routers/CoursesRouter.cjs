const express = require('express')
const file = require('../APIFeatures/fileController.cjs')
const coursesRouter = express.Router();

const coursesFunctions = require('../Functions/CoursesFunctions.cjs')
const {gridStorage} = require("../APIFeatures/UploadsImage.js");


coursesRouter.route('/singleCourse')
  .get(coursesFunctions.getCourses)
  .post(coursesFunctions.createCourse)

coursesRouter.route('/teacher/:idTeacher')
  .get(coursesFunctions.getCourses)
coursesRouter.route('/course/:courseId')
  .get(coursesFunctions.getCourse)
coursesRouter.route('/course/user/:id')
  .get(coursesFunctions.getCourseByUserId)

coursesRouter.route('/updateMembers/:courseId')
  .patch(coursesFunctions.updateCourse)


// coursesRouter.route('/image')
//   .post(file.single('image'), (req, res) => {
//     console.log(req.file)
//     res.status(200).json({
//       status: 'succeed',
//       image: req.file
//     })
//   })

coursesRouter.route('/uploads')
  .post(gridStorage().single('file'), (req, res) => {
    try {
      res.status(200).json({
        status: "Succeed",
        message: "files has saved"
      })
    } catch (err) {
      res.status(400).json({
        status: "Error",
        message: 'Files has not saved'
      })
    }
  })

module.exports = coursesRouter