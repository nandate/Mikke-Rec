var express = require('express');
var app = express();
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: './fire-test-6ce685d5b105.json',
  databaseURL: 'https://fire-test-4a04c.firebaseio.com/'
});

var db = firebase.database();
var ref = db.ref("genres");


app.get('/',function(req,res){
  res.send('Hello World');
  ref.once("value",function(snapshot){
    console.log(snapshot.val());
  })
});



var server = app.listen(3000);
//var server = app.listen(process.env.PORT,process.env.IP);
