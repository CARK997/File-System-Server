const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cd (err);

                const fileName = `${file.originalname}`;
                cb(null, fileName);
            })
        },
    }),
    limits: { fieldSize: 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'text/csv' ,
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("arquivo invalido"))
        }
    }
};