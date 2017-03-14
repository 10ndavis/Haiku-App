var express = require('express')
var app = express()
var static = require('express-static');
var port = process.env.PORT || 3000;
var mongodb = require('mongodb').MongoClient;
var connectionURL = 'mongodb://user:12345@ds145289.mlab.com:45289/haikudb'
var Promise = require('bluebird')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//CONNECTION TO MONGODB
mongodb.connect(connectionURL, function(err, db){



//GET DATA FROM DB

  function getData(callback){//make this a promise?
     db.collection("haikus", function(err, collection){
      collection.find().toArray(function(err, items){
        if(err){
          console.log(err);
        }
        callback(items);
      });
    });
  };




  //ADD DATA TO DB
  function addData(name, poem){
    db.collection("haikus", function(err, collection){
      collection.insert({"name": name, "poem": poem});
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
  getData(function(data){
    //console.log("this is data", data);
    res.send(data);
  })
})



app.post('/postPoem', function(req, res){

    var name = req.body.name;
    var poem = req.body.poem;

    addData(name, poem);
})



app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})


});