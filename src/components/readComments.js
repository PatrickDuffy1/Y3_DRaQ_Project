import React, { useEffect, useState } from "react";
import Comments from "./comments";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ReadComments() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/post/' + id)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        console.log("AAAAAAAAAAAAAAAAAAA\n", data.edited, "\nBBBBBBBBBBBBBBBBBBBBB");
    }, [data]);

    const Reload = (e)=>{

        // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
        axios.get('http://localhost:4000')
        .then( // Callback function
            (response)=>{
                setData(response.data) // Store books data if api call was succsessful
            }
        )
        .catch( // Callback function
            (error)=>{
                console.log(error); // Display error message to console if api call was unsuccsessful
            }
        );
    }

    // Render component based on the data
    return (
        <div>
            {/* Check if data.comments is defined before rendering */}
            {data.comments && (
                <Comments myData={data} ReloadData={Reload}></Comments>
            )}
        </div>
    );
}

export default ReadComments;
