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



    // Render component based on the data
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
