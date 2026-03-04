import React, { useState } from 'react';
import axios from 'axios';
import '../Signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5001/api/users/register', { username,email, password });

      console.log(response.data);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="string"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
