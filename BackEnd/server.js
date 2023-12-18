//const { FindUsername, CheckPassword, GetLoginJson } = require('./credentialManager');

const mongoose = require('mongoose');
//const { Types: { ObjectId } } = mongoose;

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


main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb+srv://adminadmin:adminadmin@cluster0.g7sn3k5.mongodb.net/MyDatabase?retryWrites=true&w=majority');


    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const commentSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    content: String,
    owner: String,
    edited: Boolean,
    dateCreated: String,
    likes: [String],
    dislikes: [String]
});

const forumSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: mongoose.Types.ObjectId,
    // },
    title: String,
    image: String,
    content: String,
    owner: String,
    edited: Boolean,
    dateCreated: String,
    likes: [String],
    dislikes: [String],
    comments: [commentSchema]
});

const accountSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: String,
    accountCreated: String,
});

const userAccountSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: mongoose.Types.ObjectId
    // },
    accounts: [accountSchema],
});

const passwordSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    password: String
});

const userPasswordSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    passwords: [passwordSchema]
});

const forumModel = mongoose.model('draq_project_forum', forumSchema, 'draq_project_forum'); // Need to specify the collectionName, otherwise it defaults to draq_project_forums (which doesnt exist)
const userAccountModel = mongoose.model('draq_project_usernames', userAccountSchema);
const passwordModel = mongoose.model('draq_project_passwords', userPasswordSchema);


// Route point that sends 'Hello World!' when passed /
app.get('/', async (req, res) => {
    // res.send(data)

    const posts = await forumModel.find();
    res.json(posts);
    //console.log(posts); 
});




app.get('/post/:id', async (req, res) => {
    const postId = req.params.id;

    const post = await forumModel.findOne({ "_id": postId });

    //const extractedPost = post.posts[0];

    res.json(post);

    //res.send(data);
});


app.post('/signin', async (req, res) => {
    //console.log(req.body);
    //console.log("Username: " + req.body.username);
    //console.log("Password: " + req.body.password);
    ////console.log(data[0].accounts);

    // let usernameIndex = FindUsername(data[0].accounts, req.body.username);
    // let correctPassword = false;

    // if (usernameIndex >= 0) {
    let loginResult;

    loginResult = await CheckCredentials(req.body.username, req.body.password);
    //}

    let validationStatus = await GetLoginJson(loginResult);


    //console.log(loginResult);
    console.log(validationStatus);
    //console.log("BBBBBBBBBBBBBBBB");
    res.send(validationStatus);
    //console.log("CCCCCCCCCCCCCCCCCC");
})

// app.post('/api/post', (req, res) => {
//     //console.log(req.body);

//     // Extract data from the request body
//     const newPost = {
//         title: req.body.title,
//         image: req.body.image,
//         content: req.body.content,
//         owner: req.body.owner,
//         edited: false,
//         dateCreated: req.body.dateCreated,
//         likes: [],
//         dislikes: [],
//         comments: [],
//     };

//     ForumModel.updateOne({}, { $push: { posts: newPost } })
//         .then(() => {
//             res.send('Post added to the existing document');
//         })
//         .catch(() => {
//             res.send('Failed to add post to the existing document');
//         });
// });

app.post('/api/post', (req, res) => {
    //console.log(req.body);

    forumModel.create({
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        owner: req.body.username,
        edited: false,
        dateCreated: req.body.dateCreated,
        likes: [],
        dislikes: [],
        comments: []
    })
    .then(() => { res.send('Book created') }) // Callback function
    .catch(() => { res.send('Book NOT created') }); // Callback function
});

app.delete('/api/post/:id', async(req, res) =>{

    console.log("Delete: " + req.params.id);
 
    let post = await forumModel.findByIdAndDelete(req.params.id); // Find book by id and delete it from the database
    res.send(post); // Will not ecxecute unitl book has been deleted
 })

 // Find book by id and update it based on the values the user submitted
 app.put('/api/post/:id', async (req, res) => {
    console.log("Update: " + req.params.id);
    console.log("AAAAAAAAAAAAAAAAAAAA");

    // Create a new object with only the attributes to be updated
    const updateObject = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        edited: true
    };

    // Use the new object in the findByIdAndUpdate method
    let post = await forumModel.findByIdAndUpdate(req.params.id, updateObject, { new: true });
    console.log("BBBBBBBBBBBBBBBBBB");
    res.send(post);
});

// Listen on the selected port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function CheckCredentials(username, password) {


    const userObject = await userAccountModel.findOne({ 'accounts.username': username }, { '_id': 1, 'accounts.$': 1 });
    console.log(userObject);

    const passwordObject = await passwordModel.findOne({ 'passwords.password': password }, { '_id': 1, 'passwords.$': 1 });
    console.log(passwordObject);


    if (userObject) {
        let userObjectId = userObject.accounts[0]._id;
        userObjectId = userObjectId.toString();
        //console.log(userObjectId);

        //console.log("AAAAAAAAAA");

        if (passwordObject) {
            let passwordObjectId = passwordObject.passwords[0]._id;
            passwordObjectId = passwordObjectId.toString();
            // console.log("BBBBBBBBBBBBBBB");

            console.log(userObjectId);
            console.log(passwordObjectId);
            // console.log(userObjectId == passwordObjectId);

            if (userObjectId == passwordObjectId) {
                return 2;
            }
        }

        return 1;

    }

    return 0;
}


async function GetLoginJson(loginResult) {
    //console.log("AAAAAAAA");

    let validUsername = false;
    let correctPassword = false;

    if (loginResult > 0) {
        validUsername = true;
    }

    if (loginResult == 2) {
        correctPassword = true;
    }

    let validLoginJson = [
        {
            "validUsername": validUsername,
            "correctPassword": correctPassword
        }
    ];

    return validLoginJson;
}
