var express = require('express')
var app = express()
var static = require('express-static');
var port = process.env.PORT || 3000;
// app.use(static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/client/index.html')
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})