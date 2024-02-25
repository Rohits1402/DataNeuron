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
