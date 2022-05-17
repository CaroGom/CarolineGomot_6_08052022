const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');


/*const multer = require('multer');
const jwt = require('jsonwebtoken');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
};


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback (null, name + Date.now() + '.' + extension);
    },
});

const filter = (req, res, callback) => {
    if (file.mimetype in MIME_TYPES){
        callback(null, true)
    }
    else{
        callback(new Error("Format d'image non valide"), false)
    }
};

const upload = multer ({
    storage: storage,
    fileFilter: filter
});



module.exports = (req, res, next) => {
    upload.single('image')(req, res, function (error) {
        if (error) {
            return res.status(403).json({error : error.message})
        }
        else {
            next();
        }
    })
}; 

*/