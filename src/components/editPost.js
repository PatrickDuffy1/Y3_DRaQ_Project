import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function EditPost(props) {
    const navigate = useNavigate();

    let { id } = useParams();

    const storedUsername = localStorage.getItem('username') || "";
    let dateCreated;

    const [title, setTitle] = useState(''); // Set book title
    const [image, setImage] = useState(''); // Set book cover
    const [content, setContent] = useState(''); // Set book author

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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Title: " + title + ", Image: " + image + ", Content: " + content);
        console.log("Username: " + storedUsername + ", Date Created: " + dateCreated);

        // Store book data 
        const newPost = {
            title: title,
            image: image,
            content: content
        };

        // Put the new book data to the server JSON
        axios.put('http://localhost:4000/api/post/' + id, newPost)
            .then()
            .catch();

        navigate('/');
    };


    return (
        <div>
            <h3>Edit Post</h3>

            {/* Form for adding new book */}
            <form onSubmit={handleSubmit}>

                {/* Input for adding book title */}
                <div className="form-group">
                    <label>Edit Post Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title} // Sets value of input box to title
                        onChange={(e) => { setTitle(e.target.value) }} // Update title when value in input box changed
                    />
                </div>

                {/* Input for adding book cover */}
                <div className="form-group">
                    <label>Edit Post Image: </label>
                    <input type="text"
                        className="form-control"
                        value={image} // Sets value of input box to cover
                        onChange={(e) => { setImage(e.target.value) }} // Update cover when value in input box changed
                    />
                </div>

                {/* Input for adding book author */}
                <div className="form-group">
                    <label>Edit Post Content: </label>
                    <input type="text"
                        className="form-control"
                        value={content} // Sets value of input box to author
                        onChange={(e) => { setContent(e.target.value) }} // Update author when value in input box changed
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