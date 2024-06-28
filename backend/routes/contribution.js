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
contributionRouter.delete('/deleteContribution/:userEmail/:category/:id', async (req, res) => {
    const { userEmail, category, id } = req.params;
    console.log(req.params)
    try { 
        const contributions = await Contribution.deleteOne({ userEmail: userEmail, [category]: { _id: id } });
        if (contributions.nModified === 0) {
            return res.status(404).json({ error: 'Contribution not found' });
        }
        return res.json({ success: true, message: 'Contribution deleted successfully' });
    } catch (error) {
        console.error('Error deleting contribution:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}); 

module.exports = contributionRouter;