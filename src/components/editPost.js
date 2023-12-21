import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {

    const { id } = useParams(); // Extract the 'id' parameter (object id of the post) from the URL
    const navigate = useNavigate();

    // State variables for title, image, and content
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    //useEffect Hook is similar componentDidMount
    useEffect(() => {

        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the url.
        axios.get('http://localhost:4000/post/' + id)
            .then((response) => {
                // Assign Response data to the arrays using useState.
                setTitle(response.data.title);
                setImage(response.data.image);
                setContent(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Edit post
    const handleSubmit = (e) => {
        e.preventDefault();

        // Store new edited post data
        const newPost = {
            title: title,
            image: image,
            content: content
        };

        // Put the edited post data to the server JSON
        axios.put('http://localhost:4000/api/post/' + id, newPost)
            .then(navigate('/')) // Go to the home page
            .catch(navigate('/')); // Go to the home page
    };

    // Render the component
    return (
        <div>
            <h3>Edit Post</h3>

            {/* Form for editing post */}
            <form onSubmit={handleSubmit}>

                {/* Input for the post title */}
                <div className="form-group">
                    <label>Edit Post Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title} // Sets value of input box to the inputted image
                        onChange={(e) => { setTitle(e.target.value) }} // Update title when the value in input box changes
                    />
                </div>

                {/* Input for the post image */}
                <div className="form-group">
                    <label>Edit Post Image (Leave blank for no image): </label>
                    <input type="text"
                        className="form-control"
                        value={image} // Sets value of input box to the inputted image
                        onChange={(e) => { setImage(e.target.value) }} // Update image when the value in input box changes
                    />
                </div>

                {/* Input for the post content */}
                <div className="form-group">
                    <label>Edit Post Content: </label>
                    <input type="text"
                        className="form-control"
                        value={content} /// Sets value of input box to the inputted content
                        onChange={(e) => { setContent(e.target.value) }} // Update content when the value in input box changes
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div>
                    <br></br>
                    <input type="submit" value="Edit Post"></input>
                </div>

            </form>
        </div>
    );
}

export default EditPost;