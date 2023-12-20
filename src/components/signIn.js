import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function SignIn() {

    const navigate = useNavigate();

    let debugShowAccounts = true;

    const storedUsername = localStorage.getItem('username') || "";
    const storedPassword = localStorage.getItem('password') || "";

    console.log(storedUsername);
    console.log(storedPassword);

    const [username, setUsername] = useState(storedUsername);
    const [password, setPassword] = useState(storedPassword);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/signin', {
                username,
                password,
            });

            if (response.data[0].validUsername === false) {
                setError('Invalid username');
            } else if (response.data[0].correctPassword === false) {
                setError('Incorrect password');
            } else if (response.data[0].validUsername === true && response.data[0].correctPassword === true) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                navigate('/');
            } else {
                setError('Login Error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setUsername('');
        setPassword('');
        navigate('/signin');
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
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

            </form>

            <br></br>
            <Button href="/createaccount">Create account</Button>
            <br></br><br></br>
            {storedUsername !== '' && (
                <div>
                    <h5>Currenly signed in as: {storedUsername}</h5>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>

            )}

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
                    </ol>
                </div>

            )}
        </div>
    );
}
