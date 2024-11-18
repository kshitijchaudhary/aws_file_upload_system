// Import the S3Client and PutObjectCommand from AWS SDK v3
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Create an S3 client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  }
});

// Export the S3 client and PutObjectCommand for use elsewhere in the application
module.exports = { s3, PutObjectCommand };
