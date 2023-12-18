import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function CreatePost()
{
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username') || "";
    let dateCreated;

    const[title, setTitle] = useState(''); // Set book title
    const[image, setImage] = useState(''); // Set book cover
    const[content, setContent] = useState(''); // Set book author

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Get the current date and time
        const currentDate = new Date();
        dateCreated = currentDate.toISOString();
    
        console.log("Title: " + title + ", Image: " + image + ", Content: " + content);
        console.log("Username: " + storedUsername + ", Date Created: " + dateCreated);
    
        // Store book data 
        const newPost = {
            title: title,
            image: image,
            content: content,
            username: storedUsername,
            dateCreated: dateCreated,
        };
    
        // Post the new book data to the server JSON
        axios.post('http://localhost:4000/api/post', newPost)
            .then()
            .catch();

        navigate('/');
    };
    

    return(
        <div>
            <h3>Hello from create</h3>

            {/* Form for adding new book */}
            <form onSubmit={handleSubmit}>
                
                {/* Input for adding book title */}
                <div className="form-group">
                    <label>Add Post Title: </label>
                    <input type="text"
                    className="form-control"
                    value={title} // Sets value of input box to title
                    onChange={(e) => { setTitle(e.target.value) }} // Update title when value in input box changed
                    />
                </div>

                {/* Input for adding book cover */}
                <div className="form-group">
                    <label>Add Post Image: </label>
                    <input type="text"
                    className="form-control"
                    value={image} // Sets value of input box to cover
                    onChange={(e) => { setImage(e.target.value) }} // Update cover when value in input box changed
                    />
                </div>

                {/* Input for adding book author */}
                <div className="form-group">
                    <label>Add Post Content: </label>
                    <input type="text"
                    className="form-control"
                    value={content} // Sets value of input box to author
                    onChange={(e) => { setContent(e.target.value) }} // Update author when value in input box changed
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div>
                    <input type="submit" value="Add Post"></input>
                </div>

            </form>
        </div>
    );
}

export default CreatePost;