import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function SignIn() {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let currentUserUsername = "";
  let currentUserPassword = "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/signin', {
        username,
        password,
      });

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n" + currentUserUsername);
      console.log(response.data);

      console.log("Username: " + response.data[0].validUsername);
      console.log("Password: " + response.data[0].correctPassword);

      if (response.data[0].validUsername == false) 
      {
        setError("Invalid username");
      } 
      else if (response.data[0].correctPassword == false) 
      {
        setError("Invalid password");
      } 
      else if (response.data[0].validUsername == true && response.data[0].correctPassword == true) 
      {
        
      } 
      else 
      {
        setError("Login Error");
      }

      currentUserUsername = "asdfghj";

      //navigate('/success');
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
