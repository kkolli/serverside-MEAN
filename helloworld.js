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
var posts = mongoose.model('Posts', postSchema);

var commentSchema = mongoose.Schema({
	name: String ,
    _post: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true }
});
var comments = mongoose.model('comments', commentSchema);

app.get('/post', function(req, res) {
    posts.find(function(err,mypost){
    	if(err) return console.error(err);
    	res.json(mypost);
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

app.put('/post/:id', function (req, res) {
    var val = {};
    val.name = req.body.name;
    posts.findOneAndUpdate({ '_id': req.params.id }, val,  function (err, postitem) {
      if(err) return console.error(err);
    });
    res.sendStatus(200);
});

app.delete('/post/:id', function (req, res) {
    posts.findOneAndDelete({ '_id': req.params.id }, function (err, postitem) {
      if(err) return console.error(err);
    });
    res.sendStatus(200);
});


app.get('/post/:id/comment', function(req, res) {
    comments.find({'_post' : req.params.post_id}, function (err, comments) {
    if(err) return console.error(err);
        res.json(mycomments);
    });
});

app.post('/post/:id/comment', function (req, res) {
    var newComments = new comments({
        name: req.body.Name,
        _post: req.params.id
    });
    newComments.save(function(err, saveitem){
        if(err) return console.error(err);
    });
    res.sendStatus(200);
});

app.put('/post/:id/comment/:Cid', function(req, res){
    res.send('PUT comments to homepage');
});

app.delete('/post/:id/comment/:Cid', function(req, res){
    res.send('delete comments to homepage');
})

server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});