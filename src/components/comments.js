import React from "react";
import CommentItem from "./commentItem";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Comments(props) {
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    // Render component based on the data
    return (
        <div>

            {/* Display post as card */}
            <Card style={{ width: '100%' }}>
                <br></br>

                {props.myData.image != "" && ( // Display post image if image exists
                    <center>
                        {/* Display post image */}
                        <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} />
                    </center>
                )}

                <Card.Body>
                    <Card.Title><h2>{props.myData.title}</h2></Card.Title> {/* Display post title */}

                    {/* Display the date the comment was created in easy to read format. Use .replace('24', '00') to change time 24:00 to 00:00*/}
                    <Card.Text>Created: {new Date(props.myData.dateCreated).toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace('24', '00')}</Card.Text>
                    <Card.Text>

                        <b>Username: {props.myData.owner}</b> {/* Display post owner */}

                        {props.myData.owner == storedUsername && ( // Display message if the current user is the owner of the post
                            <b><i>- You</i></b>
                        )}

                        <br></br>
                        {props.myData.edited === true && ( // Display message if the post has been edited
                            <b>This post has been edited<br></br></b>
                        )}

                    </Card.Text>

                    <Card.Text style={{ textAlign: 'left' }}>{props.myData.content}</Card.Text> {/* Display post content (alinged on the left of the screen) */}

                    {props.myData.owner == storedUsername && ( // Display edit and delete buttons if the current user is the owner of the post

                        // Use fragment to group multiple elements together without affecting layout or style
                        // https://react.dev/reference/react/Fragment
                        <>
                            {/* Go to the post edit page when clicked */}
                            <Button variant='secondary' style={{ margin: '5px' }} href={'/edit/' + props.myData._id}>Edit</Button>

                            {/* Delete post then go to home page when clicked */}
                            <Button variant='secondary' style={{ margin: '5px' }} onClick={(e) => {

                                // Delete the post based on its object id
                                axios.delete('http://localhost:4000/api/post/' + props.myData._id)
                                    .then((res) => {
                                        navigate('/'); // Go to home page
                                    })
                                    .catch();
                            }}>Delete</Button>
                        </>
                    )}

                </Card.Body>
            </Card>

            {storedUsername !== "" && ( // Display Create Comment button if user is signed in
                <Button href={'/createcomment/' + props.myData._id} style={{ width: '100%' }}>Create Comment</Button>
            )}

            {(props.myData.comments).length == 0 && ( // Display message if the post has no comments
                <h4>There are no comments yet</h4>
            )}

            {/* Creates map out of comments */}
            {props.myData.comments.map((comment) => ( // Display all of the posts comments

                // Pass the comment, postId, and ReloadData function to CommentItem for each of the post's comments
                <CommentItem myData={comment} key={comment._id} postId={props.myData._id} Reload={() => { props.ReloadData() }}></CommentItem>
            ))}
        </div>
    );
}

export default Comments;
