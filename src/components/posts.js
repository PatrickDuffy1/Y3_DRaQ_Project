import React from "react";
import PostsItem from "./postsItem";
import { Button } from 'react-bootstrap';

function Posts(props) {
    const storedUsername = localStorage.getItem('username') || "";

    console.log(props);

    

    return (
        <div>
            {storedUsername !== "" && (
                <Button href="/createpost" style={{ width: '100%' }}>Create Post</Button>
            )}

            {props.myData.map((post) => (
                <PostsItem myData={post} key={post._id} Reload={()=>{props.ReloadData()}}></PostsItem>
            ))}
        </div>
    );
}

export default Posts;
