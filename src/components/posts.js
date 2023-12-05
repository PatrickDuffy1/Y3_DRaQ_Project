import { useEffect, useState } from "react";
import Books from "./books";
import axios from "axios";
import { Post } from "../classes/post";

function Posts() {
  // Set book data and post objects as state variables
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  // React hook
useEffect(() => {
  axios.get('http://localhost:4000/api/books')
    .then((response) => {
      setData(response.data.myData[0].posts); // Access 'posts' property
      const postObjects = response.data.myData[0].posts.map(post => new Post(
        post._id,
        post.title,
        post.image,
        post.content,
        post.owner,
        post.likes,
        post.dislikes,
        post.comments
    ));

      setPosts(postObjects);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

for(let i = 0; i < posts.length; i++) 
{
  console.log("Posts: ", posts[i]);
  //console.log("Post title: ", posts[i].getTitle());
}

return (
  <div>
    {/* Display the Books component and passing the posts variable to it*/}
    <Books myData={posts}></Books>
  </div>
);
}

export default Posts;
