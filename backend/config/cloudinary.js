const cloudinary = require('cloudinary').v2;
const multer = require('multer');

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };