const express = require('express');
const mongoose = require('mongoose');
const collegeRouter = express.Router();
const College = require('../models/college');

collegeRouter.get('/get-colleges', async (req, res) => {
    try {
        const { name, location, branch, course, isActive } = req.query; 
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
            branches: branches || [],
            studentDomain,
            facultyDomain,
            isActive: true  
        });

        await newCollege.save();
        res.status(201).json({
            message: "College added successfully",
            result: newCollege,
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.get('/get-colleges/:id', async (req, res) => {
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
        if (updates.branches) {
            for (const branch of updates.branches) {
                if (!branch.name || !branch.courses || !Array.isArray(branch.courses)) {
                    return res.status(400).json({ 
                        message: "Each branch must have a name and courses array", 
                        success: false 
                    });
                }
            }
        }
        
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

collegeRouter.post('/add-branch/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, courses } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: "Branch name is required", success: false });
        }
        
        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ message: "Courses must be provided as an array", success: false });
        }
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        const branchExists = college.branches.some(branch => branch.name === name);
        if (branchExists) {
            return res.status(409).json({ message: "Branch already exists", success: false });
        }
        
        college.branches.push({ name, courses });
        await college.save();
        
        res.json({ 
            message: "Branch added successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.post('/add-courses/:id/:branchName', async (req, res) => {
    try {
        const { id, branchName } = req.params;
        const { courses } = req.body;
        
        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ message: "Courses must be provided as an array", success: false });
        }
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
    
        const branchIndex = college.branches.findIndex(branch => branch.name === branchName);
        
        if (branchIndex === -1) {
            return res.status(404).json({ message: "Branch not found", success: false });
        }
        const existingCourses = new Set(college.branches[branchIndex].courses);
        const newCourses = courses.filter(course => !existingCourses.has(course));
        
        college.branches[branchIndex].courses.push(...newCourses);
        await college.save();
        
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

collegeRouter.delete('/remove-branch/:id/:branchName', async (req, res) => {
    try {
        const { id, branchName } = req.params;
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        const initialLength = college.branches.length;
        college.branches = college.branches.filter(branch => branch.name !== branchName);
        
        if (college.branches.length === initialLength) {
            return res.status(404).json({ message: "Branch not found", success: false });
        }
        
        await college.save();
        
        res.json({ 
            message: "Branch removed successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.delete('/remove-course/:id/:branchName/:course', async (req, res) => {
    try {
        const { id, branchName, course } = req.params;
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        const branchIndex = college.branches.findIndex(branch => branch.name === branchName);
        
        if (branchIndex === -1) {
            return res.status(404).json({ message: "Branch not found", success: false });
        }
        
        const initialLength = college.branches[branchIndex].courses.length;
        college.branches[branchIndex].courses = college.branches[branchIndex].courses.filter(c => c !== course);
        
        if (college.branches[branchIndex].courses.length === initialLength) {
            return res.status(404).json({ message: "Course not found", success: false });
        }
        
        await college.save();
        
        res.json({ 
            message: "Course removed successfully", 
            result: college, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.get('/get-branches/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        res.json({ 
            result: college.branches, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

collegeRouter.get('/get-courses/:id/:branchName', async (req, res) => {
    try {
        const { id, branchName } = req.params;
        
        const college = await College.findById(id);
        
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }
        
        const branch = college.branches.find(branch => branch.name === branchName);
        
        if (!branch) {
            return res.status(404).json({ message: "Branch not found", success: false });
        }
        
        res.json({ 
            result: branch.courses, 
            success: true 
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

module.exports = collegeRouter;