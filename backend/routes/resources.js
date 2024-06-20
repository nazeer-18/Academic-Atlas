const express = require('express');
const resourceRouter = express.Router();
const exam = require('../models/exam');
const capstone = require('../models/capstone');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set refresh token if you already have one
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const uploadDir = process.env.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({ dest: uploadDir });

resourceRouter.post('/getexam', async (req, res) => {
    try {
        const { academicYear, branch, course } = req.body;
        let query = {};
        if (academicYear) query.academicYear = academicYear;
        if (branch) query.branch = branch;
        if (course) query.course = course;

        const examPapers = await exam.find(query);
        res.json({ examPapers: examPapers, success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

resourceRouter.post('/addexam', upload.single('pdfFile'), async (req, res) => {
    try {
        const { category, academicYear, branch, course, author } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded.", success: false });
        }

        const tmpResource = await exam.findOne({ category: category, academicYear: academicYear, branch: branch, course: course });

        if (tmpResource) {
            return res.status(409).json({ message: "Resource already exists", success: false });
        }

        const fileMetadata = {
            name: file.originalname,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
        };
        //using readstream to read the file and upload it to google drive
        const media = { mimeType: file.mimetype, body: fs.createReadStream(file.path) };
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink'
        });

        const fileUrl = response.data.webViewLink;
        const thumbnailResponse = await drive.files.get({
            fileId: response.data.id,
            fields: 'thumbnailLink'
        });
        
        const filePath = path.join(uploadDir, file.filename);

        // Delete the file after processing it from the server
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
            }
        });

        const newResource = new exam({
            category: category,
            academicYear: academicYear,
            branch: branch,
            course: course,
            fileUrl: fileUrl, 
            author: author
        });
        await newResource.save();
        return res.status(200).json({ message: "Resource added successfully", success: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message, success: false });
    }
});

resourceRouter.post('/getcapstone', async (req, res) => {
    try {
        const { academicYear, branch, course } = req.body;
        const query = {};
        if (academicYear) query.academicYear = academicYear;
        if (branch) query.branch = branch;
        if (course) query.course = course;

        const capstones = await capstone.find(query);
        res.json({ capstones: capstones, success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

resourceRouter.post('/addcapstone', async (req, res) => {
    try {
        const { title, description, academicYear, branch, courseTags, faculties, students, url } = req.body;
        const isExisting = await capstone.findOne({ title: title, academicYear: academicYear, branch: branch });

        if (isExisting) {
            res.json({ message: "Resource already exists", success: false });
        } else {
            const newResource = new capstone({
                title: title,
                description: description,
                academicYear: academicYear,
                branch: branch,
                courseTags: courseTags,
                faculties: faculties,
                students: students,
                url: url
            });

            await newResource.save();
            res.json({ message: "Resource added successfully", success: true });
        }
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

module.exports = resourceRouter;
