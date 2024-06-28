const express = require('express');
const Developer = require('../models/developer');
const developer = require('../models/developer');
const developerRoute = express.Router();
developerRoute.post('/addDeveloper',async(req,res)=>{
    try{
        const {developerName,imageurl,instaId,linkedInId,mailId} = req.body;
        const developer = await Developer.findOne({developerName: developerName});
        if(!developer){
            const newDeveloper = new Developer({
                developerName: developerName,
                imageurl: imageurl,
                instaId: instaId,
                linkedInId: linkedInId,
                mailId: mailId
            })
            newDeveloper.save()
            return res.status(200).json({
                success: true,
                message: 'Developer added successfully'
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Developer already exists'
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
});

developerRoute.get('/getDevelopers',async(req,res)=>{
    try{
        const developers = await Developer.find();
        return res.json({
            success: true,
            developers: developers
        })
    }catch(err){
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
});
module.exports =developerRoute ; 