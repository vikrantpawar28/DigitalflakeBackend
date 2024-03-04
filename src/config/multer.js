const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileExtension = file.mimetype.split('/');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '.' + fileExtension[1])
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3000000
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            cb('Error: image only')
        }
    }
})

module.exports = upload;