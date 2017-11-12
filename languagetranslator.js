// Required node packages for our application
var http = require("http");
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
var sessionMap = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true}));
app.use(express.static(__dirname));

//var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

//var prompt = require('prompt-sync')();

app.post("/readMsg", function(req, res){
    console.log(req.body);
});

var httpServer = http.createServer(app);
httpServer.listen('4000');
/*var language_translator = new LanguageTranslatorV2({
  username: '55964c59-cd74-4963-abdd-4b36a9eca912',
  password: 'cGBxOrDKleGg',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

function testFunction(input) {
language_translator.translate({
  text: input, source : 'en', target: 'fr' },
  function (err, result) {
    if (err)
      console.log('error:', err);
    else
      console.log(result.translations[0].translation);
});
}
*/

