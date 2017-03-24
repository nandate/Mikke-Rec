var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var calc = require('./calc.js');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

firebase.initializeApp({
  serviceAccount: './fire-test-6ce685d5b105.json',
  databaseURL: 'https://fire-test-4a04c.firebaseio.com/'
});

var db = firebase.database();

app.get('/',function(req,res){
  res.send('hello world');
});

app.post('/',function(req,res){
  var POST = JSON.parse(req.body);
  var userid = POST.UserID;
  res.json(req.body);
});

//var server = app.listen(3000);
var server = app.listen(process.env.PORT,process.env.IP);
