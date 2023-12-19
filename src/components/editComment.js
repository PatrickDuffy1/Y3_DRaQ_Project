import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditComment(props)
{
    let { id: postId, cid: commentId } = useParams();
    const navigate = useNavigate();

    console.log(postId + ", " + commentId);

    const storedUsername = localStorage.getItem('username') || "";
    let dateCreated;

    const[content, setContent] = useState(''); // Set book author

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
        axios.put('http://localhost:4000/editcomment/' + postId + '/' + commentId, newComment)
        .then(() => navigate('/post/' + postId))
        .catch(() => navigate('/post/' + postId));

        
    };
    

    return(
        <div>
            <h3>Edit Comment</h3>

            {/* Form for adding new book */}
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Edit Comment Content: </label>
                    <input type="text"
                    className="form-control"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
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