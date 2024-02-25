import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

/**
 * Component for displaying a table of team member details.
 * returns JSX element displaying the team member table.
 */
const TeamMemberTable = () => {
  const { teamMembers, setTeamMembers, setUpdateTeamMember, setApiCountData } =
    useAuth();

  // Function to handle updating a team member's details
  const handleUpdate = (member) => {
    setUpdateTeamMember(member);
  };

  // Fetch team member details from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch team member data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dataneuron-jarm.onrender.com/team/getTeamMember"
      );
      const data = response.data;
      setTeamMembers(data.teamMembers);
      setApiCountData(data.count);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className="team-member-table">
      <h2 className="team-member-table-title">
        Team Member Details : (Refresh after you Update)
      </h2>
      <table className="team-member-table-wrapper" style={tableStyles}>
        <thead>
          <tr>
            <th className="team-member-table-header">Name</th>
            <th className="team-member-table-header">Skills</th>
            <th className="team-member-table-header">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr
              key={member.id}
              className={
                index % 2 === 0
                  ? "team-member-table-row-even"
                  : "team-member-table-row"
              }
            >
              <td className="team-member-table-entry">{member.name}</td>
              <td className="team-member-table-entry">{member.skills}</td>
              <td className="team-member-table-entry">
                {member.contactNumber}
              </td>
              <td>
                <button
                  className="team-member-table-button"
                  onClick={() => handleUpdate(member)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles for the table
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

export default TeamMemberTable;
