const express = require('express');
const resourceRouter = express.Router();
const exam = require('../models/exam');
const capstone = require('../models/capstone');

resourceRouter.post('/getexam', async(req, res) => {
    try{
        const academicYear = req.query.academicYear || "";
        const branch = req.query.branch || "";
        const course = req.query.course || "";
        const category = req.query.category || "";
        const examPapers = await exam.find({academicYear: academicYear, branch: branch, course: course});
        res.json({examPapers: examPapers, success: true})
    }
    catch(err){
        res.json({message: err, success: false});
    }
});

resourceRouter.post('/addexam', async(req, res) => {
    try{
        const category = req.body.category;
        const academicYear = req.body.academicYear;
        const branch = req.body.branch;
        const course = req.body.course;
        const pdfFile = req.body.pdfFile;
        const author = req.body.author;
        const newResource = new exam({
            category: category,
            academicYear: academicYear,
            branch: branch,
            course: course,
            pdfFile: pdfFile,
            author: author
        })
        if(newResource){
            res.json({message: "Resource already exists", success: false});
        }
        else{
            newResource.save();
            res.json({message: "Resource added successfully", success: true});
        }
    }catch(err){
        res.json({message: err, success: false});
    }
});


resourceRouter.post('/getcapstone', async(req, res) => {
    try{
        const academicYear = req.query.academicYear || "";
        const branch = req.query.branch || "";
        const course = req.query.course || "";
        const capstones = await capstone.find({academicYear: academicYear, branch: branch, course: course});
        res.json({capstones: capstones, success: true})
    }
    catch(err){
        res.json({message: err, success: false});
    }
});


resourceRouter.post('/addcapstone', async(req, res) => {
    try{
        const {title, description, academicYear, branch, courseTags, faculties, students, url} = req.body;
        const newResource = new capstone({
            title: title,
            description: description,
            academicYear: academicYear,
            branch: branch,
            courseTags: courseTags,
            faculties: faculties,
            students: students,
            url: url
        })
        if(newResource){
            res.json({message: "Resource already exists", success: false});
        }
        else{
            newResource.save();
            res.json({message: "Resource added successfully", success: true});
        }
    }catch(err){
        res.json({message: err, success: false});
    }
});


module.exports = resourceRouter;