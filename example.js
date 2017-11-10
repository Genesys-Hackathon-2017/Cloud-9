//Node Modules
var http = require("http");
var express = require('express');
var request = require('request');

var app = express();
var sessionMap = {};
app.use(express.static(__dirname));

app.get("/index", function(req, res){
    res.redirect("/index.html");
});

var httpServer = http.createServer(app);
httpServer.listen('3000');