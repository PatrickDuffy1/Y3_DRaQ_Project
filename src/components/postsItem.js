import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

function PostsItem(props) {
  const { currentUserUsername } = useAuth();

  const likes = props.myData.likes;
  const dislikes = props.myData.dislikes;

  const likeCount = likes.length;
  const dislikeCount = dislikes.length;
  const finalLikeCount = likeCount - dislikeCount;

  console.log("AAAAAAAAAAAAAAAA\n" + currentUserUsername + "\nBBBBBBBBBBBBBBBBBBBBBBBBBB");

  return (
    <div>
      <center>
        <Link to={'/comments/' + props.myData._id} className='btn' style={{ width: '100%' }}>
          <Card>
            <center>
              <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} />
            </center>

            <Card.Body>
              <Card.Title>{props.myData.title}</Card.Title>
              <Card.Text>Username: {props.myData.owner}</Card.Text>
              <Button variant='secondary'>Like</Button>
              <b style={{ paddingLeft: 10, paddingRight: 10 }}>{finalLikeCount}</b>
              <Button variant='secondary'>Dislike</Button>
              <br></br>

              {props.myData.owner == currentUserUsername && (
                <div>
                  <Button variant='secondary' style={{ margin: '5px' }}>Edit</Button>
                  <Button variant='secondary' style={{ margin: '5px' }}>Delete</Button>
                </div>
              )}

            </Card.Body>
          </Card>
        </Link>
      </center>
    </div>
  );
}

export default PostsItem;
