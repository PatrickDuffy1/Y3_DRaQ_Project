
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function PostsItem(props) {
  const likes = props.myData.likes;
  const dislikes = props.myData.dislikes;

  const likeCount = likes.length;
  const dislikeCount = dislikes.length;
  const finalLikeCount = likeCount - dislikeCount;


  return (
    <div>
      <center>
        {/* Display Post as card */}
        <Link to={'/comments/' + props.myData._id} className='btn' style={{ width: '100%' }}>
          <Card>

            <center>
              <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} /> {/* Display post image */}
            </center>
            
            <Card.Body>
              <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}
              <Card.Text>Username: {props.myData.owner}</Card.Text> {/* Display post owner */}
              <Button variant='secondary'>Like</Button>
              <b style={{ paddingLeft: 10, paddingRight: 10 }}>{finalLikeCount}</b>
              <Button variant='secondary'>Dislike</Button>
              <br></br>
              <Button variant='secondary' style={{ margin: '5px' }}>Edit</Button>
              <Button variant='secondary' style={{ margin: '5px' }}>Delete</Button>

            </Card.Body>
            {/* When clicked changes url to the url of the book */}
          </Card>
        </Link>
      </center>
    </div>
  );
}

export default PostsItem;
