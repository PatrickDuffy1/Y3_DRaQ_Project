// books.js
import React from "react";
import BooksItem from "./bookItem";

function Books(props) {
  return (
    <div>
      {props.myData.map((post, index) => (
        <BooksItem key={post.id} myData={post}></BooksItem>
      ))}
    </div>
  );
}

export default Books;
