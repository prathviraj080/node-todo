var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');

var port = process.env.PORT || 3000;



app.use('/assets', express.static(__dirname + '/public'));

//app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);

//app.listen(port);


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});