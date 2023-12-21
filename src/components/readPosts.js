import { useEffect, useState } from "react";
import Posts from "./posts";
import axios from "axios";

function ReadPosts() {

    // State to hold the data of the posts
    const [data, setData] = useState([]);

    // React hook
    useEffect(() => {

        // Asynchronously make http request to localhost:4000 (which has the post JSON) to get post data
        axios.get('http://localhost:4000')
            .then( // Callback function
                (response) => {
                    setData(response.data); // Store posts data if api call was succsessful
                })
            .catch( // Callback function
                (error) => {
                    console.error("Axios Error:", error); // Display error message to console if api call was unsuccessful
                });

    }, [])

    const Reload = (e) => {

        // Asynchronously make http request to localhost:4000 (which has the post JSON) to get post data
        axios.get('http://localhost:4000')
            .then( // Callback function
                (response) => {
                    setData(response.data) // Store posts data if api call was succsessful
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
            {data.length == 0 && ( // Display message if tthere are no posts
                <h3>There are no posts, or the server could not be accessed</h3>
            )}

            {data.length > 0 && ( // Display posts if there are posts to display

                // Pass the posts data and ReloadData function to Posts for each of the posts
                <Posts myData={data} ReloadData={Reload}></Posts>
            )}
        </div>
    );
}

export default ReadPosts;
