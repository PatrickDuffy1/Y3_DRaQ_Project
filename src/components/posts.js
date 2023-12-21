import React from "react";
import PostsItem from "./postsItem";
import { Button } from 'react-bootstrap';

function Posts(props) {
    const storedUsername = localStorage.getItem('username') || ""; // Load the username from storage, set it to "" (no user signed in) if it does not exist.

    // Render component based on the data
    return (
        <div>
            {storedUsername !== "" && ( // Display Create Post button if user is signed in
                <Button href="/createpost" style={{ width: '100%' }}>Create Post</Button>
            )}

            {/* Creates map out of posts */}
            {props.myData.map((post) => ( // Display all of the posts

                // Pass the post and ReloadData function to postsItem for each of the posts
                <PostsItem myData={post} key={post._id} Reload={() => { props.ReloadData() }}></PostsItem>
            ))}
        </div>
    );
}

export default Posts;
