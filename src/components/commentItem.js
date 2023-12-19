
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CommentItem(props) {
    const navigate = useNavigate();
  const storedUsername = localStorage.getItem('username') || "";


  return (
    <div>
      <Card style={{ width: '100%', textAlign: 'left' }}>
        <Card.Body>
          <Card.Title>{props.myData.title}</Card.Title> {/* Display post title */}
          <Card.Text>Created: {new Date(props.myData.dateCreated).toLocaleString('en-UK', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace('24', '00')}</Card.Text>
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

          {props.myData.owner == storedUsername && (
            <>
              <Button variant='secondary' style={{ margin: '5px', marginLeft: '10px' }} href={'/editcomment/' + props.postId + '/' + props.myData._id}>Edit</Button>
              <Button variant='secondary' style={{ margin: '5px' }} onClick={(e)=>{
                    axios.delete('http://localhost:4000/api/comment/' + props.postId + '/' + props.myData._id)
                    .then((res)=>{
                        let reload = props.Reload(); // Invoke the reload fuction tat was passed from read to bookItem
                        navigate('/post/' + props.postId);
                    })
                    .catch();
                }}>Delete</Button>
              </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CommentItem;
