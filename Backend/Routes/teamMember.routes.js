const express = require("express");
const teamMemberRouter = express.Router(); // Use express.Router() directly
const TeamMember = require("../Modal/teamMember.model");
const { apiCount } = require("../Middleware/apiCount");

// Add team member (with API count middleware)
teamMemberRouter.post("/submit", apiCount, async (req, res) => {
  try {
    const { name, skills, contactNumber } = req.body;

    // Create a new TeamMember document using the submitted data
    const newTeamMember = new TeamMember({
      name,
      skills,
      contactNumber,
    });

    // Save the new team member to the database
    await newTeamMember.save();

    // Send response with success message and API count
    res.status(200).json({
      message: "Form data submitted successfully",
      count: req.body.count,
    });
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res
      .status(500)
      .send({ message: "Internal Server Error", count: req.body.count });
  }
});

// Get team members
teamMemberRouter.get("/getTeamMember", async (req, res) => {
  try {
    // Fetch all team members from the database
    const teamMembers = await TeamMember.find();
    // Send response with team members and API count
    res.json({ teamMembers, count: req.body.count });
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res
      .status(500)
      .send({ message: "Internal Server Error", count: req.body.count });
  }
});

// Update team member (with API count middleware)
teamMemberRouter.put("/update", apiCount, async (req, res) => {
  try {
    const memberId = req.body._id;
    const { name, skills, contactNumber } = req.body;

    // Find and update the team member in the database
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      memberId,
      {
        name,
        skills,
        contactNumber,
      },
      { new: true } // Return the updated document
    );

    // Check if team member was found and updated
    if (!updatedTeamMember) {
      return res
        .status(404)
        .json({ message: "Team member not found", count: req.body.count });
    }

    // Send response with success message, updated team member, and API count
    res.status(200).json({
      message: "Team member updated successfully",
      updatedTeamMember,
      count: req.body.count,
    });
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res
      .status(500)
      .send({ message: "Internal Server Error", count: req.body.count });
  }
});

module.exports = teamMemberRouter;
