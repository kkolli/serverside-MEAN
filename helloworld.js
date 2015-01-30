var express = require('/usr/local/lib/node_modules/express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var http = require('http');
var bodyParser = require('body-parser');


var db = mongoose.connection;

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var postSchema = mongoose.Schema({
    name: String
});

var commentSchema = mongoose.Schema({
	name:String
});


var posts = mongoose.model('Posts', postSchema);
var comments = mongoose.model('comments', commentSchema);

app.get('/post', function(req, res) {
    posts.find(function(err,mypost){
    	if(err) return console.error(err);
    	res.json(mypost);
    });
});

app.get('/post/comment', function(req, res) {
    comments.find(function(err, mycomments){
    	if(err) return console.error(err);
    	res.json(mycomments);
    });
});

app.post('/post', function (req, res) {
	var newPost = new posts({
		name: req.body.Name
	});
	newPost.save(function(err, saveitem){
		if(err) return console.error(err);
	});
    res.sendStatus(200);
});

app.post('/post/comment', function (req, res) {
    var newComments = new comments({
        name: req.body.Name
    });
    newComments.save(function(err, saveitem){
        if(err) return console.error(err);
    });
    res.sendStatus(200);
});

server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});