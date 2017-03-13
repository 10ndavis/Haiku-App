var express = require('express')
var app = express()
var static = require('express-static');
var port = process.env.PORT || 3000;
var mongodb = require('mongodb').MongoClient;
var connectionURL = 'mongodb://user:12345@ds145289.mlab.com:45289/haikudb'

//connect to mongodb
mongodb.connect(connectionURL, function(err, db){

  function getData(){
   db.collection("haikus", function(err, collection){
    collection.find().toArray(function(err, items){
      if(err){
        throw err;
      }
      console.log(items);//displays all items in the db
    })
   })
  }

  //add data to db
  function addData(name, title, body, date){
    db.collection("haikus", function(err, collection){
      collection.insert({"name": name, "title": title, "body": body, "date": date});
    })
  }
});



//to post to db










//handle get requests
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/client/index.html')
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})