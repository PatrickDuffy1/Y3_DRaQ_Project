import React, { useEffect, useState } from "react";
import Comments from "./comments";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ReadComments() {
    const { id } = useParams(); // Extract the 'id' parameter (object id of the selected post) from the URL

    // State to hold the post data
    const [data, setData] = useState([]);

    // React hook
    useEffect(() => {

        // Asynchronously make http request to localhost:4000/post/:id  to get the data for the post with the object id
        axios.get('http://localhost:4000/post/' + id)
            .then( // Callback function
                (response) => {
                    setData(response.data); // Store post data if api call was succsessful
                })
            .catch( // Callback function
                (error) => {
                    console.log(error); // Display error message to console if api call was unsuccsessful
                });
    }, []);

    // Automatically reload the component
    const Reload = (e) => {

        // Asynchronously make http request to localhost:4000/post/:id  to get the data for the post with the object id
        axios.get('http://localhost:4000/post/' + id)
            .then( // Callback function
                (response) => { // Callback function
                    setData(response.data) /// Store post data if api call was succsessful
                }
            )
            .catch( // Callback function
                (error) => {
                    console.log(error); // Display error message to console if api call was unsuccsessful
                }
            );
    }

    // Render component based on the data
    return (
        <div>
            {data.comments && ( // Check if data.comments is defined before rendering

                // Pass the comment data and ReloadData function to Comments for each of the posts
                <Comments myData={data} ReloadData={Reload}></Comments>
            )}
        </div>
    );
}

export default ReadComments;
