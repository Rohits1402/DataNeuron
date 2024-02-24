const express = require('express');
const teamMemberRouter = express.Router(); // Use express.Router() directly
const TeamMember = require('../Modal/teamMember.model');

teamMemberRouter.post('/submit', async (req, res) => {
  try {
    const { name, skills, contactNumber } = req.body;
    console.log('req.body: ', req.body);

    // Create a new TeamMember document using the submitted data
    const newTeamMember = new TeamMember({
      name,
      skills,
      contactNumber,
    });

    // Save the new team member to the database
    await newTeamMember.save();

    res.status(200).json({ message: 'Form data submitted successfully',count: req.body.count });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: 'Internal Server Error',count: req.body.count });
  }
});


teamMemberRouter.get('/getTeamMember', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    console.log('teamMembers: ', teamMembers);
    res.json({ teamMembers,count: req.body.count });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: 'Internal Server Error',count: req.body.count });
  }
})

teamMemberRouter.put('/update', async (req, res) => {
  try {
    const memberId = req.body._id;
    const { name, skills, contactNumber } = req.body;

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      memberId,
      {
        name,
        skills,
        contactNumber,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found', count: req.body.count });
    }

    res.status(200).json({ message: 'Team member updated successfully', updatedTeamMember, count: req.body.count });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: 'Internal Server Error' , count: req.body.count});
  }
});





module.exports = teamMemberRouter;
