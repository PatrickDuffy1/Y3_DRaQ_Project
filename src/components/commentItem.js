
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function CommentItem(props) {
  const storedUsername = localStorage.getItem('username') || "";

  const likes = props.myData.likes;
  const dislikes = props.myData.dislikes;

  const likeCount = likes.length;
  const dislikeCount = dislikes.length;
  const finalLikeCount = likeCount - dislikeCount;


  return (
    <div>
      <Card style={{ width: '100%', textAlign: 'left' }}>
        <Card.Body>
          <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}
          <Card.Text>
            <b>Username: {props.myData.owner}</b> {/* Display post owner */}
            <br></br>
            {
              props.myData.edited === true ? (
                <b>This comment has been edited<br></br></b>
              ) : null
            }

          </Card.Text>

          <Card.Text>{props.myData.content}</Card.Text>

          <Button variant='secondary'>Like</Button>
          <b style={{ paddingLeft: 10, paddingRight: 10 }}>{finalLikeCount}</b>
          <Button variant='secondary'>Dislike</Button>

          {props.myData.owner == storedUsername && (
            <>
              <Button variant='secondary' style={{ margin: '5px', marginLeft: '10px' }}>Edit</Button>
              <Button variant='secondary' style={{ margin: '5px' }}>Delete</Button>
              </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CommentItem;
