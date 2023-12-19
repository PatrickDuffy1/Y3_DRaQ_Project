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


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/createaccount', {
                username,
                password,
            });

            if (response.data[0].usernameStatus === 0) {
                setError('Username must be at least one character in length');
            } else if(response.data[0].usernameStatus === 1){
                setError('Username already exists');
            }else if (response.data[0].passwordStatus === false) {
                setError('Password must be at least one character in length');
            } else if (response.data[0].usernameStatus === 2 && response.data[0].passwordStatus === true) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                navigate('/');
            } else {
                setError('Account creation Error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h2>Create account</h2>

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
            <Button href="/signin">I already have an account</Button>
        </div>
    );
}
