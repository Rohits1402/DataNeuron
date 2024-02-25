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
      <h2 className="team-member-table-title">
        Team Member Details : (Refresh after you Update)
      </h2>
      <table className="team-member-table-wrapper">
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

// Styles
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

export default TeamMemberTable;
