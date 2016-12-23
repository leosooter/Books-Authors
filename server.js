var express = require("express");
var app = express();
var path = require('path');
var bp = require("body-parser");

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));
var routes = require('./routes');
routes(app);

app.listen(8000);
