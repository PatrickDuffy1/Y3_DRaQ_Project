import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

export default function SignIn() {
  const { setCredentials } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/signin', {
        username,
        password,
      });

      if (response.data[0].validUsername === false) 
      {
        setError('Invalid username');
      } else if (response.data[0].correctPassword === false) 
      {
        setError('Incorrect password');
      } else if (response.data[0].validUsername === true && response.data[0].correctPassword === true) 
      {
        // Set the credentials in the context
        setCredentials(username);
        navigate('/');
      } else {
        setError('Login Error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br></br>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

      </form>

      <br></br>
      <Button href="/createaccount">Create account</Button>
    </div>
  );
}
