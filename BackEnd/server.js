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

const commentSchema = new mongoose.Schema({
	content: String,
	owner: String,
	edited: Boolean,
	likes: [String],
	dislikes: [String],
});

const postSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String,
	owner: String,
	likes: [String],
	dislikes: [String],
	edited: Boolean,
	comments: [commentSchema],
});


const userSchema = new mongoose.Schema({
	username: String,
	accountCreated: String,
});

const passwordSchema = new mongoose.Schema({
	password: String,
});

const forumSchema = new mongoose.Schema({
	posts: [postSchema],
	accounts: [userSchema],
	passwords: [passwordSchema],
});

const ForumModel = mongoose.model('draq_project_forum', forumSchema, 'draq_project_forum'); // Need to specify the collectionName, otherwise it defaults to draq_project_forums (which doesnt exist)


// JSON list of books
const data = [
	{
		"posts": [{
			"_id": "0",
			"title": "Info about Wikipedia",
			"image": "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg",
			"content": "Wikipedia[note 3] is a free-content online encyclopedia written and maintained by a community of volunteers, collectively known as Wikipedians, through open collaboration and using a wiki-based editing system called MediaWiki. Wikipedia is the largest and most-read reference work in history.[3][4] It has consistently been one of the 10 most popular websites in the world, and, as of 2023, ranks as the 4th most viewed website by Semrush.[5][6] Founded by Jimmy Wales and Larry Sanger on January 15, 2001, it is hosted by the Wikimedia Foundation, an American nonprofit organization. Initially only available in English, editions in other languages were quickly developed. Wikipedias editions when combined, comprise more than 62 million articles, attracting around 2 billion unique device visits per month and more than 14 million edits per month (about 5.2 edits per second on average) as of November 2023.[7][8] As of November 2023, 25.56% of Wikipedias traffic comes from the United States, followed by Japan at 5.87%, the United Kingdom at 5.44%, Germany at 5%, Russia at 4.78%, and the remaining 53.36% split among other countries, according to data provided by Similarweb.[9] Wikipedia has been praised for its enablement of the democratization of knowledge, extent of coverage, unique structure, and culture. It has been criticized for exhibiting systemic bias, particularly gender bias against women and geographical bias against the Global South (Eurocentrism).[10][11] While the reliability of Wikipedia was frequently criticized in the 2000s, it has improved over time, receiving greater praise in the late 2010s and early 2020s,[3][10][12][note 4] having become an important fact-checking site.[13][14] Wikipedia has been censored by some national governments, ranging from specific pages to the entire site.[15][16] Articles on breaking news are often accessed as sources for frequently updated information about those events.",
			"owner": "RandomUser1",
			"likes": [],
			"dislikes": ["User1", "User2"],
			"edited": false,
			"comments": [
				{
					"_id": "0",
					"content": "Though the English Wikipedia reached three million articles in August 2009, the growth of the edition, in terms of the numbers of new articles and of editors, appears to have peaked around early 2007.[42] Around 1,800 articles were added daily to the encyclopedia in 2006; by 2013 that average was roughly 800.[43] A team at the Palo Alto Research Center attributed this slowing of growth to the project's increasing exclusivity and resistance to change.[44] Others suggest that the growth is flattening naturally because articles that could be called \"low-hanging fruit\"—topics that clearly merit an article—have already been created and built up extensively",
					"owner": "RandomUser1",
					"edited": false,
					"likes": ["User1"],
					"dislikes": ["User3"]
				},
				{
					"_id": "1",
					"content": "The domains wikipedia.com (later redirecting to wikipedia.org) and wikipedia.org were registered on January 12, 2001,[27] and January 13, 2001,[28] respectively. Wikipedia was launched on January 15, 2001[20] as a single English-language edition at www.wikipedia.com,[29] and was announced by Sanger on the Nupedia mailing list.[23] The name originated from a blend of the words wiki and encyclopedia.[30][31] Its integral policy of \"neutral point-of-view\"[32] was codified in its first few months. Otherwise, there were initially relatively few rules, and it operated independently of Nupedia.[23] Bomis originally intended it as a business for profit",
					"owner": "User1",
					"edited": true,
					"likes": ["User1", "User2"],
					"dislikes": ["User3", "User1", "User2", "User7", "User0"]
				},
				{
					"_id": "2",
					"content": "In January 2007, Wikipedia first became one of the ten most popular websites in the United States, according to Comscore Networks.",
					"owner": "User1",
					"edited": false,
					"likes": ["User1", "User2", "User11"],
					"dislikes": ["User3"]
				}]
		},
		{
			"_id": "1",
			"title": "A post about Ireland",
			"image": "https://upload.wikimedia.org/wikipedia/commons/7/74/Ireland_%28MODIS%29.jpg",
			"content": "Ireland (/ˈaɪərlənd/ ⓘ YRE-lənd; Irish: Éire [ˈeːɾʲə] ⓘ; Ulster-Scots: Airlann [ˈɑːrlən]) is an island in the North Atlantic Ocean, in north-western Europe. It is separated from Great Britain to its east by the North Channel, the Irish Sea, and St George's Channel. Ireland is the second-largest island of the British Isles, the third-largest in Europe, and the twentieth-largest in the world.[11] Geopolitically, the island of Ireland is divided between the Republic of Ireland (officially named Ireland), an independent state covering five-sixths of the island, and Northern Ireland, which is part of the United Kingdom. As of 2022, the population of the entire island is just over 7 million, with 5.1 million living in the Republic of Ireland and 1.9 million in Northern Ireland, ranking it the second-most populous island in Europe after Great Britain.",
			"owner": "User1",
			"likes": ["User1", "User2"],
			"dislikes": ["User3"],
			"edited": true,
			"comments": [
				{
					"_id": "0",
					"content": "The Romans referred to Ireland by this name too in its Latinised form, Hibernia, or Scotia.[44][45] Ptolemy records sixteen nations inhabiting every part of Ireland in 100 AD.[46] The relationship between the Roman Empire and the kingdoms of ancient Ireland is unclear. However, a number of finds of Roman coins have been made, for example at the Iron Age settlement of Freestone Hill near Gowran and Newgrange.",
					"owner": "RandomUser2",
					"edited": false,
					"likes": ["User1", "User2", "User7", "User0"],
					"dislikes": ["User3"]
				},
				{
					"_id": "1",
					"content": "All of the Irish kingdoms had their own kings but were nominally subject to the high king. The high king was drawn from the ranks of the provincial kings and ruled also the royal kingdom of Meath, with a ceremonial capital at the Hill of Tara.",
					"owner": "User1",
					"edited": true,
					"likes": ["User1", "User2"],
					"dislikes": ["User3"]
				},
				{
					"_id": "2",
					"content": "The Chronicle of Ireland records that in 431, Bishop Palladius arrived in Ireland on a mission from Pope Celestine I to minister to the Irish \"already believing in Christ\".[51] The same chronicle records that Saint Patrick, Ireland's best known patron saint, arrived the following year. There is continued debate over the missions of Palladius and Patrick, but the consensus is that they both took place[52] and that the older druid tradition collapsed in the face of the new religion.[53] Irish Christian scholars excelled in the study of Latin and Greek learning and Christian theology. In the monastic culture that followed the Christianisation of Ireland, Latin and Greek learning was preserved in Ireland during the Early Middle Ages in contrast to elsewhere in Western Europe, where the Dark Ages followed the Fall of the Western Roman Empire.",
					"owner": "RandomUser5",
					"edited": true,
					"likes": ["User1", "User2", "User12", "User21", "User7", "User0"],
					"dislikes": ["User3"]
				},
				{
					"_id": "3",
					"content": "From the 9th century, waves of Viking raiders plundered Irish monasteries and towns.",
					"owner": "User1",
					"edited": false,
					"likes": ["User1", "User2"],
					"dislikes": ["User11", "User12", "User7", "User0"]
				}]
		}
		],

		"accounts":
			[
				{
					"_id": "0",
					"username": "User1",
					"accountCreated": ""
				},
				{
					"_id": "1",
					"username": "User2",
					"accountCreated": ""
				},
				{
					"_id": "2",
					"username": "User45",
					"accountCreated": ""
				},
				{
					"_id": "3",
					"username": "User12",
					"accountCreated": ""
				},
				{
					"_id": "4",
					"username": "User17",
					"accountCreated": ""
				},
				{
					"_id": "5",
					"username": "User6",
					"accountCreated": ""
				}
			],

		"passwords":
			[
				{
					"_id": "0",
					"password": "dfg567"
				},
				{
					"_id": "1",
					"password": "fvbn4567"
				},
				{
					"_id": "2",
					"password": "cvbnmer234"
				},
				{
					"_id": "3",
					"password": "dfg678kjhg567"
				},
				{
					"_id": "4",
					"password": "zxcvbn"
				},
				{
					"_id": "5",
					"password": "123456"
				}
			]
	}
];



// Route point that sends 'Hello World!' when passed /
app.get('/', async (req, res) => {
	//res.send(data)

	const posts = await ForumModel.find();
	res.json(posts);

});



app.get('/post/:id', async (req, res) => {
	const postId = req.params.id;

	const post = await ForumModel.findOne({ "posts._id": postId }, { "posts.$": 1 });

	const extractedPost = post.posts[0];

	res.json(extractedPost);

	//res.send(data);
});


app.post('/signin', async (req, res) => {
	console.log(req.body);
	console.log("Username: " + req.body.username);
	console.log("Password: " + req.body.password);
	//console.log(data[0].accounts);

	// let usernameIndex = FindUsername(data[0].accounts, req.body.username);
	// let correctPassword = false;

	// if (usernameIndex >= 0) {
	let loginResult;

	loginResult = await CheckPassword(req.body.username, req.body.password);
	//}

	let validationStatus = await GetLoginJson(loginResult);


	console.log(loginResult);
	console.log(validationStatus);
	console.log("BBBBBBBBBBBBBBBB");
	res.send(validationStatus);
	console.log("CCCCCCCCCCCCCCCCCC");
})

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
//         console.error("Error finding username:", error);
//         return -1;
//     }
// }

async function CheckPassword(username, password) {
	// Get the ObjectId associated with the given username
	const userObject = await ForumModel.findOne(
		{ "accounts.username": username },
		{ "_id": 0, "accounts.$": 1 }
	);

	// Extract the nested object from the result
	
	//const extractedUserId = (userObjectId.usernames[0]).toString();

	const passwordObject = await ForumModel.findOne(
		{ "passwords.password": password },
		{ "_id": 0, "passwords.$": 1 }
	);

	

	if(userObject)
	{
		let userObjectId = userObject?.accounts?.[0]._id;
		userObjectId = userObjectId.toString();

		if(passwordObject)
		{
			let passwordObjectId = passwordObject?.passwords?.[0]._id;
			passwordObjectId = passwordObjectId.toString();

			console.log(userObjectId);
			console.log(passwordObjectId);
			console.log(userObjectId == passwordObjectId);

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
	console.log("AAAAAAAA");

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
