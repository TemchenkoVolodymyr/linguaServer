
const Courses = require('../Modules/CoursesModule.cjs')
const {catchAsyncError} = require("../errorControllers/CatchAsyncError.cjs");

exports.createCourse = catchAsyncError(async (req, res, next) => {

   const createCourse = await Courses.create({
      teacher: req.body.data.teacher,
      course: {
         durationCourse: req.body.data.course.durationCourse,
         finishCourse: req.body.data.course.finishCourse,
         image: req.body.data.course.image,
         members: req.body.data.course.members,
         name: req.body.data.course.name,
         startCourse: req.body.data.course.startCourse,
         subjects: req.body.data.course.subjects,
         level: req.body.data.course.level,
         language: req.body.data.course.language,
         description:req.body.data.course.description
      }
   })
      await createCourse.save()
      res.status(200).json({
         status: "Created",
         createCourse
      })
})

exports.getCourses = catchAsyncError(async (req, res) => {

   const {joinedUserId, idTeacher} = req.params
   let filter = {}
   if (joinedUserId) {
      filter = {
         "course.members":{$in:[ joinedUserId]}
      }
   } else if (idTeacher) {
      filter = {
         "teacher.id": idTeacher
      }
   }

   const courses = await Courses.find(filter)
      res.status(200).json({
         status: "Succeed",
         courses
      })
})

exports.getCourse = catchAsyncError(async (req, res) => {

   const {courseId} = req.params
   const course = await Courses.findById(courseId)

      res.status(200).json({
         status: "Succeed",
         course
      })

})

exports.getCoursesByUserId = catchAsyncError(async (req,res) => {

   const {id} = req.params

   const foundCourses = await Courses.find({"course.members":{
      $in:[id]}});

      res.status(200).json({
         status:"Succeed",
         foundCourses
      })

})

exports.updateCourse = catchAsyncError(async (req, res, next) => {


   const {courseId} = req.params
   const {updateValue} = req.body

   const updateCourse = await Courses.findByIdAndUpdate(courseId,
      {$addToSet: {"course.members": {$each: [updateValue]}}}
   )
      res.status(200).json({
         status: "Succeed",
         updateCourse
      })
})
