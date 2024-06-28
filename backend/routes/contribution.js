const express = require('express'); 
const contributionRouter = express.Router(); 
const Contribution = require('../models/contribution');

contributionRouter.post('/getContributions/:userEmail', async (req, res) => {
    const userEmail= req.params.userEmail; 
    try {   
        const contributions = await Contribution.findOne({ userEmail: userEmail }); 
        if(!contributions) {
            return res.json({
                message: 'No contributions found',
                success:true,
                contributions: {
                'midSem' : 0,
                'endSem' : 0,
                'project' : 0,
                'research' : 0
                }
            })
        }
        return res.json({
            success: true,
            contributions: {
                'midSem': contributions.midSem.length || 0,
                'endSem': contributions.endSem.length || 0, 
                'project': contributions.project.length || 0,
                'research': contributions.research.length || 0
            }
        }) 
    } catch (error) {
        console.error('Error fetching contribution lengths:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = contributionRouter;