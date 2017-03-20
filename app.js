var express = require('express');
var app = express();
var firebase = require('firebase');
var calc = require('./calc.js');


firebase.initializeApp({
  serviceAccount: './fire-test-6ce685d5b105.json',
  databaseURL: 'https://fire-test-4a04c.firebaseio.com/'
});

var db = firebase.database();

app.get('/',function(req,res){
  res.send('hello world');
  var userId = "h5wqfn6SH9aIka7o2Bz0brS9nAD2";
  calc.first_recommend(userId,db);
});

app.post('/',function(req,res){
  var userId = req.body.userid;
});

var server = app.listen(3000);
//var server = app.listen(process.env.PORT,process.env.IP);
