var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

function palindrome(str) {
	var re = /[\W_]/g;
	var lowRegStr = str.toLowerCase().replace(re, '');
	var reverseStr = lowRegStr.split('').reverse().join(''); 
	return reverseStr === lowRegStr;
}

let topScorers = [];

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/api/getScores', function(req, res) {
	
	topScorers.sort(function (a, b) {
		return a.points - b.points;
	});

	res.send(JSON.stringify(topScorers.slice(0,5)));
});

app.post('/api/submitEntry', function(req, res){

	var hScore = 0;
	var word = req.body.word;

	if(palindrome(word)) {
		hScore = word.length;

		topScorers.push({ name: req.body.name, points: hScore });
	}

	res.send(JSON.stringify(hScore));
	
});


var port = 3000;
app.listen(port, function() {
	console.log('Server', process.pid, 'listening on port', port);
});

