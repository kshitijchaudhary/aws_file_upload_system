# Cloud Computing Project 1: AWS S3 File Upload System

## Project Overview
This project is a secure web application built with Node.js that allows users to upload files to an AWS S3 bucket. It features a professional user interface, user authentication, and seamless AWS S3 integration for managing file uploads.

## Technologies Used
- **Frontend**: HTML5, CSS3 (Bootstrap/Tailwind CSS/W3CSS), JavaScript
- **Backend**: Node.js, Express.js, AWS SDK for JavaScript, Multer (for file upload handling)
- **AWS Services**: S3, IAM (Identity and Access Management)

## Setup Instructions

### Prerequisites
Before starting, make sure you have the following installed:
- **Node.js** (version 14 or higher) – [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) – npm comes with Node.js
- **AWS Account** – You'll need an AWS account to set up the S3 bucket and IAM user for access.

### 1. Clone the repository
First, clone the repository to your local machine:

`git clone https://github.com/your-username/aws-s3-file-upload.git`
`cd aws-s3-file-upload`


### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies by running:
`npm install`

### 3. Setup Environment Variables
Create a .env file in the root of the project directory and add the following environment variables:
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
SESSION_SECRET=your_session_secret_key 

### 4. Configure AWS S3
- Log into the AWS Management Console.
- Go to S3 and create a new bucket (or use an existing one) to store the uploaded files.
- Ensure that the IAM user you are using has the necessary permissions to upload to this S3 bucket.
- Attach the AmazonS3FullAccess policy to the IAM user for simplicity (or create a custom policy if needed).
- Make sure to note the Bucket Name and Region for your .env file.

### 5. Start the Server
Now you can start the application by running:

`npm start`

### 6. Access the Application
Open a web browser and go to:
`http://localhost:3000`


# API Endpoints
## POST /upload
This endpoint handles file uploads to AWS S3.

- Request Body: A file uploaded using the multipart/form-data content type.

- Response: A JSON response with success or error message.

<pre> ```json { "success": true, "message": "File uploaded successfully" } ``` </pre>

