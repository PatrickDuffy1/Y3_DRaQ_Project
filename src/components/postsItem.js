
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function PostsItem(props) {
  //const { title, image, owner } = props.myData;

  //console.log(props.myData);


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
            </Card.Body>
            {/* When clicked changes url to the url of the book */}
          </Card>
        </Link>
      </center>
    </div>
  );
}

export default PostsItem;
