//const { FindUsername, CheckPassword, GetLoginJson } = require('./credentialManager');

const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;

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

const forumSchema = new mongoose.Schema({
	// Fields from the Post schema
	posts: [
	  {
		_id: mongoose.Schema.Types.ObjectId,
		title: String,
		image: String,
		content: String,
		owner: String,
		edited: Boolean,
		dateCreated: String,
		likes: [String],
		dislikes: [String],
		comments: [
		  {
			_id: mongoose.Schema.Types.ObjectId,
			content: String,
			owner: String,
			edited: Boolean,
			dateCreated: String,
			likes: [String],
			dislikes: [String],
		  }
		],
	  }
	],
  
	// Fields from the Accounts schema
	accounts: [
	  {
		_id: mongoose.Schema.Types.ObjectId,
		username: String,
		accountCreated: String,
	  }
	],
  
	// Fields from the Passwords schema
	passwords: [
	  {
		_id: mongoose.Schema.Types.ObjectId,
		password: String,
	  }
	],
  });

const ForumModel = mongoose.model('draq_project_forum', forumSchema, 'draq_project_forum'); // Need to specify the collectionName, otherwise it defaults to draq_project_forums (which doesnt exist)

// Route point that sends 'Hello World!' when passed /
app.get('/', async (req, res) => {
	// res.send(data)
  
	const posts = await ForumModel.find({ title: { $exists: true } }).select('-posts -accounts -passwords');
	res.json(posts);
	//console.log(posts); 
  });
  



app.get('/post/:id', async (req, res) => {
	const postId = req.params.id;

	const post = await ForumModel.findOne({ "_id": postId });

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

app.post('/api/post', (req, res) => {
    //console.log(req.body);

    // Extract data from the request body
    const newPost = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        owner: req.body.owner,
        edited: false,
        dateCreated: req.body.dateCreated,
        likes: [],
        dislikes: [],
        comments: [],
    };

    ForumModel.updateOne({}, { $push: { posts: newPost } })
        .then(() => {
            res.send('Post added to the existing document');
        })
        .catch(() => {
            res.send('Failed to add post to the existing document');
        });
});


// Listen on the selected port
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})


// async function FindUsername(username) {
//     try {
//         const account = await ForumModel.findOne({ "accounts.username": username });
//         if (account) {
//             return account.accounts[0]._id;
//         } else {
//             return -1;
//         }
//     } catch (error) {
//         //console.error("Error finding username:", error);
//         return -1;
//     }
// }

async function CheckCredentials(username, password) {
	// Get the ObjectId associated with the given username
	const userObject = await ForumModel.aggregate([
        {
          $match: {
            "accounts": { $exists: true },
            "accounts.username": username
          }
        },
        {
          $unwind: "$accounts"
        },
        {
          $match: {
            "accounts.username": username
          }
        },
        {
          $project: {
            _id: "$accounts._id"
          }
        }
      ]);
      

    //console.log(userObject);

	// Extract the nested object from the result
	
	//const extractedUserId = (userObjectId.usernames[0]).toString();

    const passwordObject = await ForumModel.aggregate([
        {
          $match: {
            "passwords": { $exists: true },
            "passwords.password": password
          }
        },
        {
          $unwind: "$passwords"
        },
        {
          $match: {
            "passwords.password": password
          }
        },
        {
          $project: {
            _id: "$passwords._id"
          }
        }
      ]);

      //console.log(passwordObject);

	

	if(userObject.length > 0)
	{
		let userObjectId = userObject?.[0]._id;
		userObjectId = userObjectId.toString();
        
        //console.log("AAAAAAAAAA");

		if(passwordObject.length > 0)
		{
			let passwordObjectId = passwordObject?.[0]._id;
			passwordObjectId = passwordObjectId.toString();
            // console.log("BBBBBBBBBBBBBBB");

			// console.log(userObjectId);
			// console.log(passwordObjectId);
			// console.log(userObjectId == passwordObjectId);

			if(userObjectId == passwordObjectId)
			{
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
