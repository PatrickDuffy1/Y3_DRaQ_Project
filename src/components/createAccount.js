import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function SignIn() {

    const navigate = useNavigate();

    // State variables for username, password, and error messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Sends the username and password to the server and checks if the account creation attempt was successful
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // Make a POST request to the server with the entered username and password and attempt to create an account
            const response = await axios.post('http://localhost:4000/createaccount', {
                username,
                password,
            });

            // Based on the result of the account creation attempt
            if (response.data[0].usernameStatus === 0) { // usernameStatus value of 0 - username not at least one character in length
                setError('Username must be at least one character in length'); // Set error message that shows the reason the account creation was unsuccessful
            } else if (response.data[0].usernameStatus === 1) { // usernameStatus value of 1 - username already exists
                setError('Username already exists'); // Set error message that shows the reason the account creation was unsuccessful
            } else if (response.data[0].passwordStatus === false) { // passwordStatus value of false - password not at least one character in length
                setError('Password must be at least one character in length'); // Set error message that shows the reason the account creation was unsuccessful
            } else if (response.data[0].usernameStatus === 2 && response.data[0].passwordStatus === true) { // usernameStatus value of 2 and passwordStatus value of true - valid new username and password, account created

                // Set the current username and password in local storge to the new username and password
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                navigate('/'); // Go to home page
            } else {
                setError('Account creation Error'); // Set error message
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Display error message on console if form submission was unsuccessful
        }
    };

    // Render the component
    return (
        <div>
            <h2>Create account</h2>

            {/* Form for submitting new account credentials */}
            <form onSubmit={handleSubmit}>

                {/* Input for new username */}
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username} // Sets value of input box to the inputted username
                        onChange={(e) => setUsername(e.target.value)} // Update username when the value in input box changes
                    />
                </div>

                {/* Input for new password */}
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password} // Sets value of input box to the inputted password
                        onChange={(e) => setPassword(e.target.value)} // Update password when the value in input box changes
                    />
                </div>

                <br></br>

                {/* Calls handleSubmit when clicked */}
                <div className="form-group">
                    <input type="submit" value="Create Account" className="btn btn-primary" />
                </div>

                {error && ( // Display account creation error message if there is an error
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </form>

            <br></br>

            <Button href="/signin">I already have an account</Button> {/* Go to the signin page when clicked */}
        </div>
    );
}
