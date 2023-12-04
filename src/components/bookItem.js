// bookItem.js
import React from 'react';
import Card from 'react-bootstrap/Card';

function BooksItem(props) {
  const { title, image, owner } = props.myData;

  return (
    <div>
      <center>
        {/* Display Post as card */}
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} alt={title} /> {/* Display post image */}
          <Card.Body>
            <Card.Title>{title}</Card.Title> {/* Display post title */}
            <Card.Text>Owner: {owner}</Card.Text> {/* Display post owner */}
          </Card.Body>
        </Card>
      </center>
    </div>
  );
}

export default BooksItem;
