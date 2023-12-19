import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function CreateComment()
{
    let { id } = useParams();
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username') || "";
    let dateCreated;

    const[content, setContent] = useState(''); // Set book author

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Get the current date and time
        const currentDate = new Date();
        dateCreated = currentDate.toISOString();
    
        console.log("Content: " + content);
        console.log("Username: " + storedUsername + ", Date Created: " + dateCreated);
    
        // Store book data 
        const newComment = {
            content: content,
            username: storedUsername,
            dateCreated: dateCreated,
        };
    
        // Post the new book data to the server JSON
        axios.put('http://localhost:4000/api/comment/' + id, newComment)
            .then()
            .catch();

        navigate('/post/' + id);
    };
    

    return(
        <div>
            <h3>Create Comment</h3>

            {/* Form for adding new book */}
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Add Comment Content: </label>
                    <input type="text"
                    className="form-control"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
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