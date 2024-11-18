const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Initialize AWS S3 client
const s3 = new S3Client({ region: process.env.AWS_REGION });

// Configure multer for file upload (size limit and type validation)
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'));
        }
        cb(null, true);
    },
});

// File upload route
router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // S3 upload parameters
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    try {
        // Upload file to S3
        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);
        res.json({ success: true, message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed. Please try again.' });
    }
});

module.exports = router;
