const multer = require("multer");
const path = require("path");
// const test = require('../../')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/image");
    },
    filename: (req, file, callback) => {
      const nameFormat = `${Date.now()}-${file.originalname}${path.extname(
        file.originalname
      )}`;
    //   if (nameFormat !== ".jpg" && nameFormat !== ".jpeg" && nameFormat !== ".png") {
    //     callback(new Error("Unsupported file type!"), false);
    //     return;
    //   }
      callback(null, nameFormat);
    },
  });

const upload = multer ({
    storage: storage,
    limits: 2 * 1000 * 1000,
})

  const uploadFile = (req,res,next) => {
    const uploadImage = upload.single('image')
    uploadImage(req,res,(err)=>{
        if(err){
            res.status(500).send({
                msg: 'Error Multer',
                status: 500,
                err,
            })
        }else{
            next()
        }
            
    })
}

module.exports = uploadFile;