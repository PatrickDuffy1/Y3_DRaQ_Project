import React from "react";
import CommentItem from "./commentItem";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function Comments(props) {
    //console.log(props.myData)
    const likes = props.myData.likes;
    const dislikes = props.myData.dislikes;

    const likeCount = likes.length;
    const dislikeCount = dislikes.length;
    const finalLikeCount = likeCount - dislikeCount;

    return (
        <div>
            {/* Display Post as card */}
            <Card style={{ width: '100%' }}>
                <center>
                    <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} /> {/* Display post image */}
                </center>
                <Card.Body>
                    <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}

                    <Card.Text>
                        <b>Username: {props.myData.owner}</b> {/* Display post owner */}
                        <br></br>
                        {
                            props.myData.edited === true ? (
                                <b>This post has been edited<br></br></b>
                            ) : null
                        }

                    </Card.Text>

                    <Card.Text style={{ textAlign: 'left' }}>{props.myData.content}</Card.Text>

                    <Button variant='secondary'>Like</Button>
                    <b style={{ paddingLeft: 10, paddingRight: 10 }}>{finalLikeCount}</b>
                    <Button variant='secondary'>Dislike</Button>
                    <br></br>
                    <Button variant='secondary' style={{ margin: '5px' }}>Edit</Button>
                    <Button variant='secondary' style={{ margin: '5px' }}>Delete</Button>
                </Card.Body>
                {/* When clicked changes url to the url of the book */}
            </Card>

            {/* Creates map out of comments */}
            {props.myData.comments.map((comment) => (
                <CommentItem myData={comment} key={comment._id}></CommentItem>
            ))}
        </div>
    );
}

export default Comments;
