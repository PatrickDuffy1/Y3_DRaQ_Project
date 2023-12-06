import React, { useEffect, useState } from "react";
import Comments from "./comments";
import axios from "axios";
import { useParams } from 'react-router-dom';

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
            {/* Check if data.comments is defined before rendering */}
            {data.comments && (
                <Comments myData={data}></Comments>
            )}
        </div>
    );
}

export default ReadComments;
