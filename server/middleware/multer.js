import multer from 'multer';
import multer_s3 from 'multer-s3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../config/s3Config.js';

const storage = multer_s3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multer_s3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
        const uuid = uuidv4();
        const ext = path.extname(file.originalname);
        if(ext === 'jpg') {
            ext = 'jpeg'
        }
        cb(null, `uploads/${file.fieldname}/${uuid}_${Date.now()}${ext}`);
    }
})

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.fileValidationError = '이미지만 업로드할 수 있어요!';
        return cb(new Error('이미지만 업로드할 수 있어요!'), false);
    }
    cb(null, true);
};

const limits = { fileSize: 5 * 1024 * 1024 };
  
const upload = multer({ storage: storage, fileFilter: imageFilter, limits: limits});

export default upload;