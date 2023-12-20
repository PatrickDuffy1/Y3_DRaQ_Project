import React from "react";
import CommentItem from "./commentItem";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Comments(props) {
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem('username') || "";

    return (
        <div>

            {/* Display Post as card */}
            <Card style={{ width: '100%' }}>
                <br></br>
                <center>
                    <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} /> {/* Display post image */}
                </center>
                <Card.Body>
                    <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}
                    <Card.Text>Created: {new Date(props.myData.dateCreated).toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace('24', '00')}</Card.Text>
                    <Card.Text>

                        <b>Username: {props.myData.owner}</b> {/* Display post owner */}

                        {props.myData.owner == storedUsername && (
                            <b><i>- You</i></b>
                        )}

                        <br></br>
                        {
                            props.myData.edited === true ? (
                                <b>This post has been edited<br></br></b>
                            ) : null
                        }

                    </Card.Text>

                    <Card.Text style={{ textAlign: 'left' }}>{props.myData.content}</Card.Text>

                    {props.myData.owner == storedUsername && (
                        <div>
                            <Button variant='secondary' style={{ margin: '5px' }} href={'/edit/' + props.myData._id}>Edit</Button>
                            <Button variant='secondary' style={{ margin: '5px' }} onClick={(e) => {
                                axios.delete('http://localhost:4000/api/post/' + props.myData._id)
                                    .then((res) => {
                                        navigate('/');
                                    })
                                    .catch();
                            }}>Delete</Button>
                        </div>
                    )}

                </Card.Body>
                {/* When clicked changes url to the url of the book */}
            </Card>

            {storedUsername !== "" && (
                <Button href={'/createcomment/' + props.myData._id} style={{ width: '100%' }}>Create Comment</Button>
            )}

            {(props.myData.comments).length == 0 && (
                <h4>There are no comments yet</h4>
            )}

            {/* Creates map out of comments */}
            {props.myData.comments.map((comment) => (
                <CommentItem myData={comment} key={comment._id} postId={props.myData._id} Reload={() => { props.ReloadData() }}></CommentItem>
            ))}
        </div>
    );
}

export default Comments;
