var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var calc = require('./calc.js');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

firebase.initializeApp({
  serviceAccount: './Mikke-87878efbcf62.json',
  databaseURL: 'https://mikke-d5d0a.firebaseio.com/'
});

var db = firebase.database();

app.get('/',function(req,res){
  calc.first_recommend("lktFuJHhiZbtnYaJeVimoGf3uXq2",db);
  res.send('hello world');
});

app.post('/',function(req,res){
  var userid = req.body.UserID;
  calc.first_recommend(userid,db);
  res.json(req.body);
});

//var server = app.listen(3000);
app.listen(process.env.PORT,process.env.IP);
