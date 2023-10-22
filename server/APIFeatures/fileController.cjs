// const multer = require('multer')
//
// const moment = require('moment')
//
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//
//     const date = moment().format('DDMMYYYY-HHmmss_SSS')
//     cb(null, `${date}-${file.originalname}`)
//   }
// })
//
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'|| file.mimetype === 'image/jpeg') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }
// const limits = {
//   fileSize: 1024 * 1024 * 5
// }
// module.exports = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: limits
// })

const express = require('express')

const mongoose = require('mongoose')

const Grid = require('gridfs-stream')

const multer = require('multer')
const {GridFsStorage} = require("multer-gridfs-storage");



const connectToMongoDB = mongoose.createConnection(process.env.MONGODB_URI,{
   useNewUrlParser:true,
   useUnifiedTopology:true
})

let gfs;
connectToMongoDB.once('open', () => {
   gfs = Grid(connectToMongoDB.db,mongoose.mongo);
   gfs.collection('uploads')
})

const storage = new GridFsStorage({
   url:process.env.MONGODB_URI,
   file:(req,file) => {
      return new Promise((resolve,reject) => {
         const filename = file.originalname;
            const fileInfo = {
               filename:filename,
               bucketName:'uploads'
            };
            resolve(fileInfo)
      })
   }
})
exports.upload = multer({storage})