import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";


export const storageFiles = () =>{

  let fileStorage = multer.diskStorage({
    destination:"uploads",
    filename(req, file, callback) {
      let fileName = file.originalname

      fileName = fileName.substr(0,fileName.indexOf('.')) + "_" + Date.now() + fileName.substr(fileName.indexOf("."));
      callback(null,fileName)
    }
  })
  let fileUpload = multer({storage:fileStorage})
  return fileUpload
}
require('dotenv').config()
const mongoDb =  process.env.MONGODB_URI
export const gridStorage = () => {

  let storageFS = new GridFsStorage({
    mongoDb,
    file:(req,file) => {
      return {
        filename : file.originalname,
        bucketName:"gridUploads"
      }
    }
  })

  let uploadGrid = multer({storage : storageFS})
return uploadGrid
}

