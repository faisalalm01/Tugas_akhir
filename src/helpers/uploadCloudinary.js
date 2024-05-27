const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadCloudinary = (req, res, next) => {
    const pathFile = req.file.path
    const uniqueName = new Date().toISOString()

    cloudinary.uploader.upload(
        pathFile, {

    resource_type: 'raw',
    public_id: `crime-capture/${uniqueName}`,
    tags: `crime-capture`,
        },
    (err,Image) => {
        if(err) return res.status(500).send(err)
        console.log('file uploader to cloudinary');

        fs.unlinkSync(pathFile)
        req.Image = Image
        next()
        }
    )
}

module.exports = uploadCloudinary;