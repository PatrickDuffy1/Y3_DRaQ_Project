import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const navigate = useNavigate();

    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    // State variables for title, image, and content
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    // Add new post
    const handleSubmit = (e) => {
        e.preventDefault();

        // Store new comment data
        const newPost = {
            title: title,
            image: image,
            content: content,
            username: storedUsername
        };

        // Post the new post data to the server JSON
        axios.post('http://localhost:4000/api/post', newPost)
            .then(navigate('/')) // Go to the home page
            .catch(navigate('/')); // Go to the home page
    };

    // Render the component
    return (
        <div>
            <h3>Create Post</h3>

            {/* Form for adding new post */}
            <form onSubmit={handleSubmit}>

                {/* Input for the post title */}
                <div className="form-group">
                    <label>Add Post Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title} // Sets value of input box to the inputted image
                        onChange={(e) => { setTitle(e.target.value) }} // Update title when the value in input box changes
                    />
                </div>

                {/* Input for the post image */}
                <div className="form-group">
                    <label>Add Post Image (Leave blank for no image): </label>
                    <input type="text"
                        className="form-control"
                        value={image} // Sets value of input box to the inputted image
                        onChange={(e) => { setImage(e.target.value) }} // Update image when the value in input box changes
                    />
                </div>

                {/* Input for the post content */}
                <div className="form-group">
                    <label>Add Post Content: </label>
                    <input type="text"
                        className="form-control"
                        value={content} // Sets value of input box to the inputted content
                        onChange={(e) => { setContent(e.target.value) }} // Update content when the value in input box changes
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div>
                    <br></br>
                    <input type="submit" value="Add Post"></input>
                </div>

            </form>
        </div>
    );
}

export default CreatePost;