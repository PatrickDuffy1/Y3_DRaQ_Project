
import React from "react";
import PostsItem from "./postsItem";

function Posts(props)
{
    // Creates map out of myBooks
    return props.myData.map
    (
        (post)=>
        {
            return <PostsItem myData={post} key={post._id}></PostsItem> // Passes the current book to BooksItem and sets the isbn as the key
        }
    );
}

export default Posts;
