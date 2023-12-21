import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditComment() {
    const { id: postId, cid: commentId } = useParams(); // Extract the 'id' and 'cid parameters (object ids of the post and comment) from the URL
    const navigate = useNavigate();

    const [content, setContent] = useState(''); // State variable for comment content

    //useEffect Hook is similar componentDidMount
    useEffect(() => {

        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the url.
        axios.get('http://localhost:4000/api/comment/' + postId + '/' + commentId)
            .then((response) => {
                // Assign Response data to the arrays using useState.
                setContent(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Edit comment
    const handleSubmit = (e) => {
        e.preventDefault();

        // Store new edited comment data
        const newComment = {
            content: content,
        };

        // Put the edited comment data to the server JSON
        axios.put('http://localhost:4000/api/editcomment/' + postId + '/' + commentId, newComment)
            .then(() => navigate('/post/' + postId)) // Reload the post page
            .catch(() => navigate('/post/' + postId)); // Reload the post page
    };

    // Render the component
    return (
        <div>
            <h3>Edit Comment</h3>

            {/* Form for editing comment */}
            <form onSubmit={handleSubmit}>

                {/* Input for comment content */}
                <div className="form-group">
                    <label>Edit Comment Content: </label>
                    <input type="text"
                        className="form-control"
                        value={content} // Sets value of input box to the inputted content
                        onChange={(e) => { setContent(e.target.value) }} // Update content when the value in input box changes
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div>
                    <br></br>
                    <input type="submit" value="Edit Comment"></input>
                </div>
            </form>
        </div>
    );
}

export default EditComment;