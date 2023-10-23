const express = require('express')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const multer = require('multer')
const {GridFsStorage} = require("multer-gridfs-storage");

const connectToMongoDB = mongoose.createConnection(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

let gfs;
connectToMongoDB.once('open', () => {
   gfs = Grid(connectToMongoDB.db, mongoose.mongo);
   gfs.collection('uploads')
})


// save file on mongoDB
const storage = new GridFsStorage({
   url: process.env.MONGODB_URI,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         const filename = file.originalname;
         const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
         };
         resolve(fileInfo)
      })
   }
})
// get file from mongoDB
exports.getFile = (req,res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
         return res.status(404).json({
            err: 'Файл не существует'
         });
      }


      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
   });
}

exports.upload = multer({storage})