import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function CreateComment() {
    let { id } = useParams(); // Extract the 'id' parameter (object id of the post) from the URL
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    const [content, setContent] = useState(''); // State variable for comment content

    // Add new comment to post
    const handleSubmit = (e) => {
        e.preventDefault();

        // Store new comment data
        const newComment = {
            content: content,
            username: storedUsername
        };

        // Put the new comment data to the server JSON
        axios.put('http://localhost:4000/api/comment/' + id, newComment)
            .then(() => navigate('/post/' + id)) // Reload the post page
            .catch(() => navigate('/post/' + id)); // Reload the post page
    };

    // Render the component
    return (
        <div>
            <h3>Create Comment</h3>

            {/* Form for adding new comment */}
            <form onSubmit={handleSubmit}>

                {/* Input for comment content */}
                <div className="form-group">
                    <label>Add Comment Content: </label>
                    <input type="text"
                        className="form-control"
                        value={content} // Sets value of input box to the inputted content
                        onChange={(e) => { setContent(e.target.value) }} // Update content when the value in input box changes
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div>
                    <br></br>
                    <input type="submit" value="Add Comment"></input>
                </div>
            </form>
        </div>
    );
}

export default CreateComment;