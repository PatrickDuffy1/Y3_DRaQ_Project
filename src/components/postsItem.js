import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function PostsItem(props) {
    const navigate = useNavigate();
  const storedUsername = localStorage.getItem('username') || "";

  const likes = props.myData.likes;
  const dislikes = props.myData.dislikes;

  const likeCount = likes.length;
  const dislikeCount = dislikes.length;
  const finalLikeCount = likeCount - dislikeCount;

  //console.log("AAAAAAAAAAAAAAAA\n" + currentUserUsername + "\nBBBBBBBBBBBBBBBBBBBBBBBBBB");
  console.log(props.myData._id + " " + props.myData.title);
  console.log(storedUsername);

  

  return (
    <div>
      <center>
        <Link to={'/post/' + props.myData._id} className='btn' style={{ width: '100%' }}>
          <Card>
            <center>
            <br></br>
              <Card.Img variant="top" src={props.myData.image} alt={props.myData.title} style={{ width: '18rem' }} />
            </center>

            <Card.Body>
              <Card.Title>{props.myData.title}</Card.Title>
              <Card.Text>Username: {props.myData.owner}</Card.Text>
              {/* <Button variant='secondary'>Like</Button>
              <b style={{ paddingLeft: 10, paddingRight: 10 }}>{finalLikeCount}</b>
              <Button variant='secondary'>Dislike</Button>
              <br></br> */}

              

            </Card.Body>
          </Card>
        </Link>

        {props.myData.owner == storedUsername && (
                <div>
                  <Button variant='secondary' style={{ margin: '5px' } } href={'/edit/' + props.myData._id}>Edit</Button>
                  <Button variant='secondary' style={{ margin: '5px' }} onClick={(e)=>{
                    axios.delete('http://localhost:4000/api/post/' + props.myData._id)
                    .then((res)=>{
                        let reload = props.Reload(); // Invoke the reload fuction tat was passed from read to bookItem
                        navigate('/');
                    })
                    .catch();
                }}>Delete</Button>
                <br></br><br></br>
                </div>
              )}
      </center>
    </div>
  );
}

export default PostsItem;
