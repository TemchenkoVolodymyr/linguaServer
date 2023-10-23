const express = require('express')
const coursesRouter = express.Router();

const coursesFunctions = require('../Functions/CoursesFunctions.cjs')
const {upload, getFile} = require("../APIFeatures/fileController.cjs");


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

coursesRouter.route('/upload/:filename?')
  .post(upload.single('file'), (req, res) => {
    console.log(req.file)
    res.status(200).json({
      status: 'Succeed',
      file: req.file
    })

  })
   .get((req,res) => getFile(req,res))

module.exports = coursesRouter