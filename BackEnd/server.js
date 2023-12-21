const mongoose = require('mongoose');

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

// Call the asynchronous main function to establish a connection to the MongoDB database, and handle any potential errors by logging them to the console.
main().catch(err => console.log(err));

// Establish MongoDB connection
async function main() {

    await mongoose.connect('mongodb+srv://adminadmin:adminadmin@cluster0.g7sn3k5.mongodb.net/MyDatabase?retryWrites=true&w=majority');
}

// Schemas for MongoDB collections
// The schema of the comments array (which is in the forum collection)
const commentSchema = new mongoose.Schema({
    content: String,
    owner: String,
    edited: Boolean,
    dateCreated: String
});

// The schema of the forum collection
const forumSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    owner: String,
    edited: Boolean,
    dateCreated: String,
    comments: [commentSchema] // Use comment schema as array type
});

// The schema of the accounts array (which is in the account collection)
const accountSchema = new mongoose.Schema({
    username: String,
    accountCreated: String,
});

// The schema of the accounts collection
const userAccountSchema = new mongoose.Schema({
    accounts: [accountSchema],
});

// The schema of the passwords array (which is in the passwords collection)
const passwordSchema = new mongoose.Schema({
    password: String
});

// The schema of the passwords collection
const userPasswordSchema = new mongoose.Schema({
    passwords: [passwordSchema]
});

// Models created from schemas
// Need to specify the collection name for draq_project_forum, otherwise it defaults to draq_project_forums (which doesn't exist)
const forumModel = mongoose.model('draq_project_forum', forumSchema, 'draq_project_forum');
const userAccountModel = mongoose.model('draq_project_usernames', userAccountSchema);
const passwordModel = mongoose.model('draq_project_passwords', userPasswordSchema);


// Route point that sends all of the documents in the forum collection when passed /
app.get('/', async (req, res) => {

    const posts = await forumModel.find(); // Finds all documents in the forum collection

    res.json(posts);
});

// Route point that sends a specific post document from the forum collection based on an object id
app.get('/post/:id', async (req, res) => {

    const postId = req.params.id; // Set postId equal to the id in the url
    const post = await forumModel.findOne({ "_id": postId }); // Finds a specific post document from the forum based on an object id

    res.json(post);
});

// Route point for signing into account
app.post('/signin', async (req, res) => {

    let loginResult = await CheckCredentials(req.body.username, req.body.password); // Check if the username exists and if the password is correct

    res.json(await GetLoginJson(loginResult)); // Post the result of the login attempt as JSON
})

// Route point for creating new account
app.post('/createaccount', async (req, res) => {

    let usernameStatus = 0; // Creates usernameStatus and sets it to 0 (0 is invalid - username is not at least one character in length)
    let passwordStatus = false; // Creates passwordStatus and sets it to false (false is invalid - password is not at least one character in length)

    if ((req.body.username).length > 0) { // Checks if the username is at least one character in length

        if ((await getUsernameId(req.body.username)) == "") { // Checks if the username already exists
            usernameStatus = 2; // Sets usernameStatus to 2 (valid new username)

            if ((req.body.password).length > 0) { // Checks if the password is at least one character long
                passwordStatus = true; // Sets passwordStatus to true (valid new password)

                // Gets the current date and time
                const currentDate = new Date();
                let dateCreated = currentDate.toISOString();

                // Adds the new username and the date/time to the array of usernames in the accounts collection
                await userAccountModel.updateOne(
                    {},
                    {
                        $push: {
                            'accounts': {
                                username: req.body.username,
                                accountCreated: dateCreated,
                            },
                        },
                    }
                );

                userId = await getUsernameId(req.body.username); // Gets the object id of the newly created username

                // Adds the new password to the array of passwords in the passwords collection and gives it the same object id as the username
                await passwordModel.updateOne(
                    {},
                    {
                        $push: {
                            'passwords': {
                                _id: userId,
                                password: req.body.password,
                            },
                        },
                    }
                );
            }
        }
        else {
            usernameStatus = 1; // Sets usernameStatus to 2 (invalid - username already exists)
        }
    }

    // Creates a json object with the result of the validation on the new username and password
    let validNewAccountJson = [
        {
            "usernameStatus": usernameStatus,
            "passwordStatus": passwordStatus
        }
    ];

    res.send(validNewAccountJson); // Post the result of the account creation attempt as JSON
})

// Route point for creating new post
app.post('/api/post', (req, res) => {

    // Gets the current date and time
    const currentDate = new Date();
    let dateCreated = currentDate.toISOString();

    // Adds a new post document to the forum collection
    forumModel.create({
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        owner: req.body.username,
        edited: false, // Set edited to false when a post is first created
        dateCreated: dateCreated,
        comments: []
    })
        .then(() => { res.send('Post created') }) // Callback function
        .catch(() => { res.send('Post NOT created') }); // Callback function
});

// Route point that deletes a specific post document from the forum collection based on an object id
app.delete('/api/post/:id', async (req, res) => {

    const post = await forumModel.findByIdAndDelete(req.params.id); // Find a specific post by its object id and delete it from the collection
    res.send(post); // Will not excecute until the post has been deleted
})

// Route point that finds post by it oject id and updates it based on the values the user submitted
app.put('/api/post/:id', async (req, res) => {

    // Create a new object with only the attributes to be updated
    const updateObject = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        edited: true // Set edited to true when a post has been edited
    };

    // Update the post withe the attributes in the new object
    const post = await forumModel.findByIdAndUpdate(req.params.id, updateObject, { new: true });
    res.send(post);
});

// Route point that sends a specific comment based on its object id and its posts object id
app.get('/api/comment/:id/:cid', async (req, res) => {

    // Get a specific comment based on its object id and the posts object id
    const post = await forumModel.findOne(
        { _id: req.params.id, 'comments._id': req.params.cid },
        { 'comments.$': 1 }
    );

    const comment = post.comments[0]; // Get the comment from the comments array
    res.json(comment);

});

// Route point that adds a comment to a post's comments array based on the post's object id
app.put('/api/comment/:id', async (req, res) => {

    // Gets the current date and time
    const currentDate = new Date();
    let dateCreated = currentDate.toISOString();

    // Create a new object with the new comments attributes
    const newComment = {
        title: req.body.title,
        content: req.body.content,
        owner: req.body.username,
        edited: false, // Set edited to false when a comment is first created
        dateCreated: dateCreated
    };

    // Use findByIdAndUpdate to add the new comment to the comments array
    const post = await forumModel.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: newComment } },
        { new: true }
    );

    res.json(post);
});

// Route point that deletes a specific comment from a post's comments array based on the post's object id and the comments object id
app.delete('/api/comment/:id/:cid', async (req, res) => {

    // Use findByIdAndUpdate to delete the specified comment from the comments array
    const updatedDocument = await forumModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { comments: { _id: req.params.cid } } },
        { new: true }
    );

    res.json(updatedDocument);

})

// Route point that edits a specific comment in a post's comments array based on the post's object id and the comments object id
app.put('/api/editcomment/:id/:cid', async (req, res) => {

    // Create a new object with only the attributes to be updated
    const updatedComment = {
        content: req.body.content,
        edited: true, // Set edited to true when a comment has been edited
    };

    const post = await forumModel.findById(req.params.id); // Get the post based on its object id

    // Find the index of the comment in the comments array of the post
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.cid);

    // Merge using Object.assign()
    // https://www.javascripttutorial.net/es6/javascript-object-assign/
    const updatedPost = post.toObject();
    const updatedCommentObject = Object.assign({}, updatedPost.comments[commentIndex], updatedComment);
    updatedPost.comments[commentIndex] = updatedCommentObject; // Put updated object back in comments array

    await forumModel.findByIdAndUpdate(req.params.id, updatedPost, { new: true }); // Update the collection with the updated post

    res.json(updatedPost);
});


// Listen on the selected port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Return the result of the username and password validation checks
async function CheckCredentials(username, password) {

    let userObjectId = await getUsernameId(username); // Get the object id of the username (empty string if username does not exist)

    if (userObjectId != "") { // Check if the username exists

        let passwordObjectId = await getPasswordId(password); // Get the object id of the password (empty string if password does not exist)

        if (passwordObjectId != "") { // Check if the password exists

            if (userObjectId == passwordObjectId) { // Check if the object ids of the username and password match
                return 2; // Return 2 (Valid login)
            }
        }

        return 1; // Return 1 (Invalid login - Valid username, incorrect password)
    }

    return 0; // Return 0 (Invalid login - Invalid username)
}

// Return a json object with the results of the login attempt
async function GetLoginJson(loginResult) {

    // Set both to false - (Invalid Username, incorrect password)
    let validUsername = false;
    let correctPassword = false;

    if (loginResult > 0) { // Set validUsername to true - (Valid Username, incorrect password)
        validUsername = true;
    }

    if (loginResult == 2) { // Set correctPassword to true - (Valid Username, Correct password)
        correctPassword = true;
    }

    // Note: Will never have a situation where validUsername is false and validPassword is true - (Invalid Username, Correct password)

    // Create a json object with the results of the login attempt
    let validLoginJson = [
        {
            "validUsername": validUsername,
            "correctPassword": correctPassword
        }
    ];

    return validLoginJson;
}

// Returns object id of username, returns "" if username does not exist
async function getUsernameId(username) {

    // Search for username 
    const userObject = await userAccountModel.findOne({ 'accounts.username': username }, { '_id': 1, 'accounts.$': 1 });

    if (userObject) { // Check if username was found

        let userObjectId = userObject.accounts[0]._id; // Get the object id from the accounts array
        userObjectId = userObjectId.toString(); // Convert the object id to a string

        return userObjectId; // Return the object id of the username as a String
    }

    return ""; // Return "" if the username does not exist
}

// Returns object id of password, returns "" if password does not exist
async function getPasswordId(password) {

    // Search for password
    const passwordObject = await passwordModel.findOne({ 'passwords.password': password }, { '_id': 1, 'passwords.$': 1 });

    if (passwordObject) { // Check if password was found

        let passwordObjectId = passwordObject.passwords[0]._id; // Get the object id from the passwords array
        passwordObjectId = passwordObjectId.toString(); // Convert the object id to a string

        return passwordObjectId; // Return the object id of the password as a String
    }

    return ""; // Return "" if the password does not exist
}

