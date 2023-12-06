// books.js
import React from "react";
import CommentItem from "./commentItem";

function Comments(props)
{
    // Creates map out of myBooks
    return props.myData.comments.map
    (
        (comment)=>
        {
            return <CommentItem myData={comment} key={comment._id}></CommentItem> // Passes the current book to BooksItem and sets the isbn as the key
        }
    );
}

export default Comments;
