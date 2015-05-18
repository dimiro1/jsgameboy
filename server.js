'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.listen(port, function() {
  console.log('Server running http://localhost:' + port);
});
