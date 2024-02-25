import React, { useState } from "react";
import axios from "axios";
import "./form.css"; // Import your CSS file

/**
 * Component for user signup form.
 *  setRegistered - Function to set the registration status.
 * returns JSX element displaying the signup form.
 */
export const Signup = ({ setRegistered }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const apiUrl = "https://dataneuron-jarm.onrender.com/user/register";

  const formData = {
    name: fullName,
    email,
    password,
    username,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      if (response.status === 200) {
        setRegistered(false);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          placeholder="Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Username:</label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p onClick={() => setRegistered(false)}>Go to Login</p>
    </div>
  );
};
