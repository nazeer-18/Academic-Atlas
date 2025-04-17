const express = require('express');
const mongoose = require('mongoose');
const collegeRouter = express.Router();
const College = require('../models/college');

collegeRouter.get('/get-colleges', async (req, res) => {
    try {
        const { name, location, branch, course, isActive } = req.body;
        let query = {};
        
        if (name) query.name = name;
        if (location) query.location = location;
        if (branch) query.branches = branch;
        if (course) query.courses = course;
        if (isActive !== undefined) query.isActive = isActive;
        
        const results = await College.find(query);
        res.json({ results: results, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/add-college', async (req, res) => {
    try {
        const { name, location, branches, courses, studentDomain, facultyDomain } = req.body;
        const existingCollege = await College.findOne({ name: name });
        if (existingCollege) {
            return res.status(409).json({ message: "College already exists", success: false });
        }
        
        const newCollege = new College({
            name,
            location,
            branches,
            courses,
            studentDomain,
            facultyDomain
        });
        
        await newCollege.save();
        res.status(201).json({ 
            message: "College added successfully", 
            id: newCollege._id, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.get('/get-college/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ result: college, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.put('/update-college/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        
        const college = await College.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            message: "College updated successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.delete('/delete-college/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const college = await College.findByIdAndDelete(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ message: "College deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/add-branches/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { branches } = req.body;
        
        if (!branches || !Array.isArray(branches)) {
            return res.status(400).json({ message: "Branches must be provided as an array", success: false });
        }
        
        const college = await College.findByIdAndUpdate(
            id,
            { $addToSet: { branches: { $each: branches } } },
            { new: true }
        );
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            message: "Branches added successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/add-courses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { courses } = req.body;
        
        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ message: "Courses must be provided as an array", success: false });
        }
        
        const college = await College.findByIdAndUpdate(
            id,
            { $addToSet: { courses: { $each: courses } } },
            { new: true }
        );
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            message: "Courses added successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.put('/toggle-active/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const college = await College.findById(id);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        college.isActive = !college.isActive;
        await college.save();
        
        res.json({ 
            message: `College ${college.isActive ? 'activated' : 'deactivated'} successfully`, 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/remove-branches/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { branches } = req.body;
        
        if (!branches || !Array.isArray(branches)) {
            return res.status(400).json({ message: "Branches must be provided as an array", success: false });
        }
        
        const college = await College.findByIdAndUpdate(
            id,
            { $pullAll: { branches: branches } },
            { new: true }
        );
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            message: "Branches removed successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/remove-courses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { courses } = req.body;
        
        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ message: "Courses must be provided as an array", success: false });
        }
        
        const college = await College.findByIdAndUpdate(
            id,
            { $pullAll: { courses: courses } },
            { new: true }
        );
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            message: "Courses removed successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

module.exports = collegeRouter;