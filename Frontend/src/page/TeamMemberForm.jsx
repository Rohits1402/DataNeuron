import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

/**
 * Component for adding/editing team member details.
 * Renders a form for adding/editing team member information.
 * returns JSX element displaying the form for adding/editing team member details.
 */
const TeamMemberForm = () => {
  const {
    setTeamMembers,
    updateTeamMember,
    setUpdateTeamMember,
    setApiCountData,
  } = useAuth();

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    contactNumber: "",
  });

  // Effect hook to set form data when updateTeamMember changes
  useEffect(() => {
    setFormData(
      updateTeamMember
        ? updateTeamMember
        : {
            name: "",
            skills: "",
            contactNumber: "",
          }
    );
  }, [updateTeamMember]);

  // Function to handle input change in the form fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ name: "", skills: "", contactNumber: "" });

    try {
      let url = "https://dataneuron-jarm.onrender.com/team/submit";
      if (updateTeamMember) {
        url = "https://dataneuron-jarm.onrender.com/team/update";
        let payload = {
          ...updateTeamMember,
          ...formData,
        };
        const response = await axios.put(url, payload);
        setApiCountData(response.data.count);
        setUpdateTeamMember(null);
      } else {
        const response = await axios.post(url, formData);
        setApiCountData(response.data.count);
      }

      const responseData = await fetch(
        "https://dataneuron-jarm.onrender.com/team/getTeamMember"
      );
      const data = await responseData.json();
      setTeamMembers(data.teamMembers);
      setApiCountData(data.count);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form className="team-member-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="name">
        Name:
      </label>
      <input
        className="form-input"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <label className="form-label" htmlFor="skills">
        Skills:
      </label>
      <input
        className="form-input"
        type="text"
        id="skills"
        name="skills"
        value={formData.skills}
        onChange={handleInputChange}
        required
      />

      <label className="form-label" htmlFor="contactNumber">
        Contact Number:
      </label>
      <input
        className="form-input"
        type="tel"
        id="contactNumber"
        name="contactNumber"
        value={formData.contactNumber}
        pattern="[0-9]{10}"
        placeholder="Enter 10-digit number"
        onChange={handleInputChange}
        required
      />

      <button className="form-button" type="submit">
        {updateTeamMember ? "Update Team Member" : "Add new team member"}
      </button>
    </form>
  );
};

export default TeamMemberForm;
