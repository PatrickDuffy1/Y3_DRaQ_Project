
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CommentItem(props) {
  //const { title, image, owner } = props.myData;

  //console.log(props.myData);


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
                <b>This comment has been edited</b>
              ) : null
            }

          </Card.Text>

          {props.myData.content}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CommentItem;
