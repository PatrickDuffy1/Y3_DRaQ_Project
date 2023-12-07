import React, { useEffect, useState } from "react";
import Comments from "./comments";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function ReadComments() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/comments/' + id)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // This will only log after the axios call is complete and data has been updated
    useEffect(() => {
        console.log("AAAAAAAAAAAAAAAAAAA\n", data, "\nBBBBBBBBBBBBBBBBBBBBB");
    }, [data]);

    // Render your component based on the data
    return (
        <div>

            <center>
                {/* Display Post as card */}
                    <Card style={{ width: '100%'}}>
                    <center>
                        <Card.Img variant="top" src={data.image} alt={data.title} style={{ width: '18rem' }}/> {/* Display post image */}
                    </center>
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title> {/* Display post title */}
                            <Card.Text><b>Poster: {data.owner}</b></Card.Text> {/* Display post owner */}
                            <Card.Text style={{ textAlign: 'left' }}>{data.content}</Card.Text>
                        </Card.Body>
                        {/* When clicked changes url to the url of the book */}
                    </Card>
            </center>

            {/* Check if data.comments is defined before rendering */}
            {data.comments && (
            <Comments myData={data}></Comments>
            )}
        </div>
    );
}

export default ReadComments;
