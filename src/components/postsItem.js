import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios";

function PostsItem(props) {
    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    // Render component based on the data
    return (
        <div>
            <center>
                <Link to={'/post/' + props.myData._id} className='btn' style={{ width: '100%' }}> {/* Link to post */}

                    {/* Display post as card */}
                    <Card>

                        {props.myData.image != "" && ( // Display post image if image exists

                            <center>
                                <br></br>

                                {/* Display the posts image */}
                                <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} />
                            </center>
                        )}

                        <Card.Body>
                            <Card.Title><h3>{props.myData.title}</h3></Card.Title> {/* Display the posts title */}

                            {/* Display the date the comment was created in easy to read format. Use .replace('24', '00') to change time 24:00 to 00:00*/}
                            <Card.Text>Created: {new Date(props.myData.dateCreated).toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace('24', '00')}</Card.Text>

                            <Card.Text>
                                Username: {props.myData.owner}{/* Display post owner */}

                                {props.myData.owner == storedUsername && ( // Display message if the current user is the owner of the post
                                    <i>- You</i>
                                )}

                                <br></br>
                                {props.myData.edited === true && ( // Display message if the post has been edited
                                    <b>This post has been edited<br></br></b>
                                )}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Link>

                {props.myData.owner == storedUsername && ( // Display edit and delete buttons if the current user is the owner of the post

                    // Use fragment to group multiple elements together without affecting layout or style
                    // https://react.dev/reference/react/Fragment
                    <>
                        {/* Go to the post edit page when clicked */}
                        <Button variant='secondary' style={{ margin: '5px' }} href={'/edit/' + props.myData._id}>Edit</Button>

                        {/* Delete post then reload page when clicked */}
                        <Button variant='secondary' style={{ margin: '5px' }} onClick={(e) => {

                            // Delete the post based on its object id
                            axios.delete('http://localhost:4000/api/post/' + props.myData._id)
                                .then(() => {
                                    props.Reload(); // Invoke the reload fuction that was passed from posts.js
                                })
                                .catch();
                        }}>Delete</Button>
                        <br></br><br></br>
                    </>
                )}
            </center>
        </div>
    );
}

export default PostsItem;
