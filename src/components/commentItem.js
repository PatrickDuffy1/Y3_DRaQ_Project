import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function CommentItem(props) {

    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    // Render component based on the data
    return (
        <div>

            {/* Display comment as card */}
            <Card style={{ width: '100%', textAlign: 'left' }}>
                <Card.Body>

                    {/* Display the date the comment was created in easy to read format. Use .replace('24', '00') to change time 24:00 to 00:00*/}
                    <Card.Text>Created: {new Date(props.myData.dateCreated).toLocaleString('en-UK', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace('24', '00')}</Card.Text>

                    <Card.Text>
                        <b>Username: {props.myData.owner}</b> {/* Display comment owner */}

                        {props.myData.owner == storedUsername && ( // Display message if the current user is the owner of the comment
                            <b><i>- You</i></b>
                        )}

                        <br></br>
                        {props.myData.edited === true && ( // Display message if the comment has been edited
                            <b>This comment has been edited<br></br></b>
                        )}

                    </Card.Text>

                    <Card.Text>{props.myData.content}</Card.Text> {/* Display comment content */}

                    {props.myData.owner == storedUsername && ( // Display edit and delete buttons if the current user is the owner of the comment

                        // Use fragment to group multiple elements together without affecting layout or style
                        // https://react.dev/reference/react/Fragment
                        <>
                            {/* Go to the comment edit page when clicked */}
                            <Button variant='secondary' style={{ margin: '5px', marginLeft: '10px' }} href={'/api/editcomment/' + props.postId + '/' + props.myData._id}>Edit</Button>
                            
                            {/* Delete comment then reload page when clicked */}
                            <Button variant='secondary' style={{ margin: '5px' }} onClick={(e) => {

                                // Delete the comment based on the post and comment object ids
                                axios.delete('http://localhost:4000/api/comment/' + props.postId + '/' + props.myData._id)
                                    .then(() => {
                                        props.Reload(); // Invoke the reload fuction that was passed from comments.js
                                    })
                                    .catch();
                            }}>Delete</Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CommentItem;
