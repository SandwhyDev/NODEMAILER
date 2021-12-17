const multer = require('multer');
const path = require('path');

const upload_foto_storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, path.join(__dirname, `../uploads/static/profiles`))
    },
    filename : (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload_profiles = multer({ storage : upload_foto_storage})

module.exports = upload_profiles