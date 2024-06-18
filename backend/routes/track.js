const express = require('express');
const User = require('../models/user');
const trackRoute = express.Router();
const Track = require('../models/track');

trackRoute.post('/addBranch',async(req,res)=>{
    try{
        const {branch} = req.body;
        const track = await Track.findOne({branch: branch});
        if(!track){
            const newTrack = new Track({
                branch: branch
            })
            newTrack.save()
            return res.status(200).json({
                success: true,
                message: 'Branch added successfully'
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Branch already exists'
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
});

trackRoute.post('/addCourse',async(req,res)=>{
    try{
        const {course} = req.body;
        const track = await Track.findOne({course: course});
        if(!track){
            const newTrack = new Track({
                course: course
            })
            newTrack.save()
            return res.status(200).json({
                success: true,
                message: 'Course added successfully'
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Course already exists'
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
});

trackRoute.get('/getBranches',async(req,res)=>{
    try{
        const branches = await Track.find({branch: {$ne: null}});
        return res.status(200).json({
            success: true,
            branches: branches
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
});

trackRoute.get('/getCourses',async(req,res)=>{
    try{
        const courses = await Track.find({course: {$ne: null}});
        return res.status(200).json({
            success: true,
            courses: courses
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
});


module.exports = trackRoute;