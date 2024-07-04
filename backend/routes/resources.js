const express = require('express');
const resourceRouter = express.Router();
const exam = require('../models/exam');
const capstone = require('../models/capstone');
const contribution = require('../models/contribution');
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

const updateContribution = async (mail, category, id) => {
    let updateField;
    switch (category) {
        case 'midSem':
            updateField = { midSem: id };
            break;
        case 'endSem':
            updateField = { endSem: id };
            break;
        case 'project':
            updateField = { project: id };
            break;
        case 'research':
            updateField = { research: id };
            break;
        default:
            return ({ message: "Invalid category.", success: false });
    }
    if (contribution.findOne({ userEmail: mail }) === null) {
        const newContribution = new contribution({
            userEmail: mail,
            midSem: [],
            endSem: [],
            project: [],
            research: []
        });
        await newContribution.save();
    }
    await contribution.findOneAndUpdate(
        { userEmail: mail },
        { $push: { [category]: id } },
        { upsert: true, new: true }
    );
}

resourceRouter.post('/get-exam', async (req, res) => {
    try {
        const { academicYear, branch, course, category, author } = req.body;
        let query = {};
        if (academicYear) query.academicYear = academicYear;
        if (branch) query.branch = branch;
        if (course) query.course = course;
        if (category) query.category = category;
        if (author) query.author = author;
        const results = await exam.find(query);
        res.json({ results: results, success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

resourceRouter.post('/add-exam', upload.single('pdfFile'), async (req, res) => {
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
        const filePath = path.join(uploadDir, file.filename);
        const newResource = new exam({
            category: category,
            academicYear: academicYear,
            branch: branch,
            course: course,
            fileUrl: fileUrl,
            author: author,
            fileId: response.data.id
        });
        await newResource.save();
        await updateContribution(author, category, newResource._id);
        // Delete the file after processing it from the server
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
            }
        });

        return res.status(200).json({ message: "Resource added successfully", success: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message, success: false });
    }
});

resourceRouter.delete('/delete-exam/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resource = await exam.findByIdAndDelete(id);
        const fileId = resource.fileId;
        if (!resource) {
            return res.status(404).json({ message: "Resource not found", success: false });
        }
        await drive.files.delete({ fileId: fileId });
        await updateContribution(resource.author, resource.category, id);
        res.json({ message: "Resource deleted successfully", success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

resourceRouter.get('/download/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, { responseType: 'stream' });
        res.setHeader('Content-Disposition', 'attachment');
        response.data
            .on('end', () => {
                console.log('Done downloading file.');
            })
            .on('error', (err) => {
                console.error('Error downloading file.');
                res.status(500).send('Error downloading file.');
            })
            .pipe(res);
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
})

resourceRouter.get('/getThumbnail/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const response = await drive.files.get({
            fileId: fileId,
            fields: 'thumbnailLink'
        });
        res.json({ thumbnailLink: response.data.thumbnailLink, success: true });
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

resourceRouter.post('/get-capstone', async (req, res) => {
    try {
        const { academicYear, branch, course, category, author } = req.body;
        const query = {};
        if (academicYear) query.academicYear = academicYear;
        if (branch) query.branch = branch;
        if (course) query.course = course;
        if (category) query.category = category;
        if (author) query.author = author;
        const results = await capstone.find(query);
        res.json({ results: results, success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

resourceRouter.post('/add-capstone', upload.none(), async (req, res) => {
    try {
        const { title, academicYear, branch, course, author, url, category } = req.body;
        const isExisting = await capstone.findOne({ title: title, academicYear: academicYear, branch: branch, category: category });
        if (isExisting) {
            res.json({ message: "Resource already exists", success: false });
        } else {
            const newResource = new capstone({
                title: title,
                academicYear: academicYear,
                branch: branch,
                course: course,
                author: author,
                url: url,
                category: category
            });
            await newResource.save();
            await updateContribution(author, category, newResource._id);
            res.json({ message: "Resource added successfully", success: true });
        }
    } catch (err) {
        console.log(err)
        res.json({ message: err.message, success: false });
    }
});

//delete capstone
resourceRouter.delete('/delete-capstone/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resource = await capstone.findByIdAndDelete(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found", success: false });
        }
        await updateContribution(resource.author, resource.category, id);
        res.json({ message: "Resource deleted successfully", success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

module.exports = resourceRouter;
