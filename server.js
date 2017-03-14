var express = require('express')
var app = express()
var static = require('express-static');
var port = process.env.PORT || 3000;
var mongodb = require('mongodb').MongoClient;
var connectionURL = 'mongodb://user:12345@ds145289.mlab.com:45289/haikudb'

//CONNECTION TO MONGODB
mongodb.connect(connectionURL, function(err, db){



//GET DATA FROM DB
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




  //ADD DATA TO DB
  function addData(name, title, body, date){
    db.collection("haikus", function(err, collection){
      collection.insert({"name": name, "title": title, "body": body, "date": date});
    })
  }














//handle get requests
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/client/index.html')
});

app.get('/haikusServices.js', function (req, res) {
  res.sendfile(__dirname + '/app/services/haikusServices.js')
});

app.get('/haikusController.js', function (req, res) {
  res.sendfile(__dirname + '/app/haikus/haikusController.js')
});


app.get('/getPoems', function(req, res){
  var resData = getData();//Map to server function to get all data
  res.send(resData);
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})


});