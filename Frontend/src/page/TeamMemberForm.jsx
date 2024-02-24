import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
const TeamMemberForm = () => {
  const {
    setTeamMembers,
    updateTeamMember,
    setUpdateTeamMember,
    setApiCountData,
  } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    contactNumber: "",
  });
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ name: "", skills: "", contactNumber: "" });
    console.log(formData);

    try {
      let url = "http://localhost:8000/team/submit";
      if (updateTeamMember) {
        url = "http://localhost:8000/team/update";
        let payload = {
          ...updateTeamMember,
          ...formData,
        };
        const response = await axios.put(url, payload);
        setApiCountData(response.data.count);
        setUpdateTeamMember(null);
        setFormData({
          name: "",
          skills: "",
          contactNumber: "",
        });
      } else {
        const response = await axios.post(url, formData);
        setApiCountData(response.data.count);
        setFormData({
          name: "",
          skills: "",
          contactNumber: "",
        });
      }
      // console.log("Success:", response.data);
      const responsedata = await fetch("localhost:8000/team/getTeamMember");
      const data = await responsedata.json();
      setTeamMembers(data.teamMembers);
      setApiCountData(data.count);
      // You can handle success, e.g., show a success message or redirect the user
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // You can handle errors, e.g., show an error message to the user
    }
  };

  return (
    <form
      className="team-member-form"
      style={formStyles}
      onSubmit={handleSubmit}
    >
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
        style={inputStyles}
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
        style={inputStyles}
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
        style={inputStyles}
      />

      <button className="form-button" type="submit" style={buttonStyles}>
        {updateTeamMember ? "Update Team Member" : "Add new team member"}
      </button>
    </form>
  );
};

// Styles
const formStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "80%",
  overflowY: "auto",
  maxHeight: "80vh",
};

const inputStyles = {
  width: "100%",
  padding: "8px",
  marginBottom: "16px",
  boxSizing: "border-box",
};

const buttonStyles = {
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
};

export default TeamMemberForm;
