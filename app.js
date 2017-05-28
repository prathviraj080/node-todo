var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var bodyParser = require('body-parser');
var Task = require('./models/todoListModel');

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/todoListRoutes');
routes(app);

//var setupController = require('./controllers/setupController');

var port = process.env.PORT || 3000;


app.use(express.static('./public')); 
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//app.use('/public', express.static(__dirname + '/public'));

//app.set('view engine', 'ejs');

//mongoose.connect(config.getDbConnectionString());
//setupController(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});