import { Router } from 'express';
import upload from '../middleware/multer.js';

export const imageController = Router();

imageController.post('/post', upload.single('postImage'), async (req, res) => {
    return res.send(JSON.stringify({"imageUrl" : req.file.location}));
});