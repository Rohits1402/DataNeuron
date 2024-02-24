import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
const TeamMemberTable = () => {
  const { teamMembers, setTeamMembers, setUpdateTeamMember, setApiCountData } =
    useAuth();
  console.log("teamMembers: ", teamMembers);

  const handleUpdate = (member) => {
    console.log("member: ", member);
    setUpdateTeamMember(member);
  };

  useEffect(() => {
    // Fetch team member details from the API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/team/getTeamMember");
      const data = await response.json();
      setTeamMembers(data.teamMembers);
      setApiCountData(data.count);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  return (
    <div className="team-member-table">
      <h2>Team Member Details</h2>
      <table className="table" style={tableStyles}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.skills}</td>
              <td>{member.contactNumber}</td>
              <td onClick={() => handleUpdate(member)}>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

export default TeamMemberTable;
