import React, { useState } from "react";
import "./form.css"; // Import your CSS file
import axios from "axios";
import { useAuth } from "../AuthContext";

/**
 * Component for user login form.
 * setRegistered - Function to set the registration status.
 * returns JSX element displaying the login form.
 */
export const Login = ({ setRegistered }) => {
  const { token, login, setUserDetails, setApiCountData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseStatus, setResponseStatus] = useState(0);

  const apiUrl = "https://dataneuron-jarm.onrender.com/user/login";

  const formData = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      if (response.status === 200) {
        login(response.data.token);
        setUserDetails(response.data.user);
        setApiCountData(response.data.count);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Set response status based on error response
      setResponseStatus(error.response ? error.response.status : 500);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
      {/* Display error message if response status is 200 (success) */}
      <p style={{ color: "red" }}>
        {responseStatus === 200 ? "Wrong credentials" : ""}
      </p>
      <p onClick={() => setRegistered(true)}>Go to SignUp</p>
    </div>
  );
};
