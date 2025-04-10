// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        username,
        password
      });
      console.log("Registration response:", response); // ✅ log this
      setMsg("Registration successful! You can login now.");
    } catch (err) {
      console.error("Registration error:", err); // ✅ log this
      setMsg(
        err.response?.data?.error
          ? `Registration failed: ${err.response.data.error}`
          : "Registration failed. Please try again."
      );
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
