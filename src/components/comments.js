import { useEffect, useState } from "react";
import Books from "./books";
import axios from "axios";

function Comments() 
{
    return(
        <div>
           <h1>Hello World</h1>
           <h2>It is {new Date().toLocaleTimeString()}.</h2> {/*Gets and displays current time */}
        </div>
    );
}

export default Comments;