// bookItem.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function BooksItem(props) {
  //const { title, image, owner } = props.myData;

  //console.log(props.myData);


  return (
    <div>
      <center>
        {/* Display Post as card */}
        <Link to={'/comments/' + props.myData.id} className='btn'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} /> {/* Display post image */}
            <Card.Body>
              <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}
              <Card.Text>Poster: {props.myData.owner}</Card.Text> {/* Display post owner */}
            </Card.Body>
            {/* When clicked changes url to the url of the book */}
          </Card>
        </Link>
      </center>
    </div>
  );
}

export default BooksItem;
