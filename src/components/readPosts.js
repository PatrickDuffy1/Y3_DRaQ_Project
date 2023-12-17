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

  return (
    <div>
      {/* Display the Books component and passing the data variable to it*/}
      <Posts myData={data}></Posts>
    </div>
  );
}

export default ReadPosts;
