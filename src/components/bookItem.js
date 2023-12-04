// bookItem.js
import React from 'react';
import Card from 'react-bootstrap/Card';

function BooksItem(props) {
  const posts = props.myData.posts || [];
  console.log("Data in BooksItem component:", props.myData);

  return (
    <div>
      <center>
        {/* Display each post as a card */}
        {posts.map((post, index) => (
          <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Img variant="top" src={post.image} alt={post.title} /> {/* Display post image */}
            <Card.Body>
              <Card.Title>{post.title}</Card.Title> {/* Display post title */}
              <Card.Text>Owner: {post.owner}</Card.Text> {/* Display post owner */}
            </Card.Body>
          </Card>
        ))}
      </center>
    </div>
  );
}

export default BooksItem;
