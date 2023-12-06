// books.js
import React from "react";
import BooksItem from "./bookItem";

function Books(props)
{
    // Creates map out of myBooks
    return props.myData.map
    (
        (post)=>
        {
            return <BooksItem myData={post} key={post._id}></BooksItem> // Passes the current book to BooksItem and sets the isbn as the key
        }
    );
}

export default Books;
