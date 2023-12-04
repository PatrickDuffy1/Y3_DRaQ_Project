// read.js
import { useEffect, useState } from "react";
import Books from "./books";
import axios from "axios";

function Read() {
  // Set book data
  const [data, setData] = useState([]);

  // React hook
  useEffect(() => {
    // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
    axios.get('http://localhost:4000/api/books')
      .then((response) => {
        setData(response.data.myData); // Store books data if API call was successful
        console.log(response.data.myData);
      })
      .catch((error) => {
        console.log(error); // Display error message to console if API call was unsuccessful
      });
  }, []);

  return (
    <div>
      {/* Display the Books component and passing the data variable to it*/}
      <Books myData={data}></Books>
    </div>
  );
}

export default Read;
