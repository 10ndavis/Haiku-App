var express = require('express')
var app = express()
var static = require('express-static');

app.use(static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/client/index.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})