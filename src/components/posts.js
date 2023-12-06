import { useEffect, useState } from "react";
import Books from "./books";
import axios from "axios";
import { Post } from "../classes/post";

function Posts() {
  // Set book data and post objects as state variables
  const [data, setData] = useState([]);

  // React hook
  useEffect(
    ()=>{

        
        // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
        axios.get('http://localhost:4000')
        .then( // Callback function
            (response)=>{
                setData(response.data[0].posts) // Store books data if api call was succsessful
            }
        )
        .catch( // Callback function
            (error)=>{
                console.log(error); // Display error message to console if api call was unsuccsessful
            }
        );

    },[]
)

console.log(data);


return(
  <div>
      {/* Display the Books component and passing the data variable to it*/}
      <Books myData={data}></Books>
  </div>
);
}

export default Posts;
