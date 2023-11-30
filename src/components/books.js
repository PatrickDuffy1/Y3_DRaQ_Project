import { render } from "@testing-library/react";
import BooksItem from "./bookItem";

function Books(props)
{
    // Creates map out of myBooks
    return props.myBooks.map
    (
        (book)=>
        {
            return <BooksItem myBook={book} key={book.isbn}></BooksItem> // Passes the current book to BooksItem and sets the isbn as the key
        }
    );
}

export default Books;
    