const express = require('express')
const app = express()
const port = 4000; // Port that will be used

// Use cors to allow cross origin requests
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use body-parser for POST method
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JSON list of books
const data = [
    {
        "posts":[{
            "_id": "0",
            "title": "Test title",
            "image": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg",
            "content": "This is the content of the post",
            "owner": "RandomUser1",
			"likes": ["User1", "User2"],
			"dislikes": ["User3"],
            "comments":[
            {
                "_id": "0",
                "content": "This is comment 0 of post 0",
				"owner": "RandomUser1",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            },
            {
                "_id": "1",
                "content": "This is comment 1 of post 0",
				"owner": "RandomUser7",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            },
            {
                "_id": "2",
                "content": "This is comment 2 of post 0",
				"owner": "RandomUser6",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            }]
        },
		{
            "_id": "1",
            "title": "Test title 2",
            "image": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg",
            "content": "This is the content of the second post",
            "owner": "RandomUser2",
			"likes": [],
			"dislikes": ["User1", "User2"],
            "comments":[
            {
                "_id": "0",
                "content": "This is comment 0 of post 1",
				"owner": "RandomUser2",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            },
            {
                "_id": "1",
                "content": "This is comment 1 of post 1",
				"owner": "RandomUser1",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            },
            {
                "_id": "2",
                "content": "This is comment 2 of post 1",
				"owner": "RandomUser5",
				"likes": ["User1", "User2"],
				"dislikes": ["User3"]
            }]
        }
		]
    }
    ];



// Route point that sends 'Hello World!' when passed /
app.get('/', (req, res) => {
    res.send(data)
})

// Route point that sends the individual post when passed /comments/:id
app.get('/comments/:id', (req, res) => {
    
    res.send(data[0].posts[req.params.id]);
});


// Route point that sends the new book when passed /api/book
app.post('/api/book', (req, res) => {
    console.log(req.body);
    res.send("Data Recieved!");
})

// Route point that sends the books JSON when passed /api/books
app.get('/api/books', (req, res) => {



    res.json({
        myData: data,
        "Message": "Some useful Information",
        "Disclaimer": "Hello World!"
    })
})

// Listen on the selected port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})