import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function SignIn() {

    const navigate = useNavigate();

    let debugShowAccounts = true; // Debug - Shows the usernames and passwords when true

    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.
    const storedPassword = localStorage.getItem('password') || ""; // Load the password from storage, set it to "" (no user signed in) if it does not exist.

    // State variables for username, password, and error messages
    const [username, setUsername] = useState(storedUsername);
    const [password, setPassword] = useState(storedPassword);
    const [error, setError] = useState('');

    // Sends the username and password to the server and checks if the sign in attempt was successful
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // Make a POST request to the server with the entered username and password and attempt to sign into an account
            const response = await axios.post('http://localhost:4000/signin', {
                username,
                password,
            });

            // Based on the result of the sign in attempt
            if (response.data[0].validUsername === false) { // validUsername value of false - username does not exist
                setError('Invalid username'); // Set error message that shows the reason the sign in attempt was unsuccessful
            } else if (response.data[0].correctPassword === false) { // correctPassword value of false - Incorrect password
                setError('Incorrect password'); // Set error message that shows the reason the sign in attempt was unsuccessful
            } else if (response.data[0].validUsername === true && response.data[0].correctPassword === true) { // validUsername value of true and correctPassword value of true - valid credentials, signed in
                
                // Set the current username and password in local storge to the entered username and password
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                navigate('/'); // Go to home page
            } else {
                setError('Login Error'); // Display error message
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Display error message on console if form submission was unsuccessful
        }
    };

    // Logs the user out of their account
    const handleLogout = () => {

        // Removes the username and password items from storage
        localStorage.removeItem('username');
        localStorage.removeItem('password');

        // Sets the username and password to ''
        setUsername('');
        setPassword('');

        navigate('/signin'); // Go to signin page
    };

    // Render the component
    return (
        <div>
            <h2>Sign in</h2>

            {/* Form for submitting sign in credentials */}
            <form onSubmit={handleSubmit}>

                {/* Input for username */}
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
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>

                {error && ( // Display sign in error message if there is an error
                    <div className="error-message">
                        {error}
                    </div>
                )}

            </form>

            <br></br>
            <Button href="/createaccount">Create account</Button> {/* Go to the createaccount page when clicked */}
            <br></br><br></br>
            {storedUsername !== '' && ( // Displays username if user is already signed in
                <div>
                    <h5>Currenly signed in as: {storedUsername}</h5>
                    <Button onClick={handleLogout}>Logout</Button> {/* Calls handleLogout when clicked */}
                </div>

            )}

            {/* Only displayed when debugShowAccounts is true. Shows list of usernames and passwords.
                This list is not dynamic, it does not include any accounts created after the list was made. */}
            {debugShowAccounts == true && (
                <div style={{ border: '1px solid black' }}>
                    <br></br>
                    Debug: This list is only for debug purposes. It is not normally visible. This list is not dynamic, it does not include any accounts created after the list was made.
                    <ol>
                        <li>Username: User1, Password: dfg567</li>
                        <li>Username: User2, Password: fvbn4567</li>
                        <li>Username: User45, Password: cvbnmer234</li>
                        <li>Username: User12, Password: dfg678kjhg567</li>
                        <li>Username: User17, Password: zxcvbn</li>
                        <li>Username: User6, Password: 123456</li>
                        <li>Username: RandomUser, Password: 123</li>
                        <li>Username: RandomUser5, Password: asdfgh</li>
                    </ol>
                </div>

            )}
        </div>
    );
}
