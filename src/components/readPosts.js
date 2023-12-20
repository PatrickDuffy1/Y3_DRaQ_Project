import { useEffect, useState } from "react";
import Posts from "./posts";
import axios from "axios";

function ReadPosts() {
    // Set book data and post objects as state variables
    const [data, setData] = useState([]);

    // React hook
    useEffect(() => {
        // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
        axios.get('http://localhost:4000')
            .then((response) => {
                console.log("Axios Response:", response);
                setData(response.data); // Store books data if api call was successful
            })
            .catch((error) => {
                console.error("Axios Error:", error); // Display error message to console if api call was unsuccessful
            });

    }, [])

    console.log("Data:", data);

    const Reload = (e) => {

        // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
        axios.get('http://localhost:4000')
            .then( // Callback function
                (response) => {
                    setData(response.data) // Store books data if api call was succsessful
                }
            )
            .catch( // Callback function
                (error) => {
                    console.log(error); // Display error message to console if api call was unsuccsessful
                }
            );
    }

    return (
        <div>
            {data.length == 0 && (
                <h3>There are no posts, or the server could not be accessed</h3>
            )}

            {data.length > 0 && (
                <Posts myData={data} ReloadData={Reload}></Posts>
            )}
        </div>
    );
}

export default ReadPosts;
