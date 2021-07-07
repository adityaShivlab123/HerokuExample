import multer from 'multer';

//Image Upload Helper Function/Configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb, next) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})






