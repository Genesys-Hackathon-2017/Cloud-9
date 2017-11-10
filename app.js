//Node Modules
var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

var app = express();
var sessionMap = {};

// Express Middleware - dependencies for Express app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));

var clientId = '12df5196-bdda-4fe0-8f75-dd1d6bdd8b67';
var clientSecret = 'Pc1CO2DiBlTmI0Hom42yLI9kgQmNFSXzkvNNK1CNFKk';
var redirectURI = 'http://localhost:3000/index.html';

// For use of PureCloud's npm module
const platformClient = require('purecloud-platform-client-v2');

// Create various API instances
var authorizationApi = new platformClient.AuthorizationApi();
var usersApi = new platformClient.UsersApi();

// client holds the API access token after we authenticate
var client = platformClient.ApiClient.instance;
// Configure OAuth2 access token for authorization: PureCloud Auth
platformClient.ApiClient.instance.authentications['PureCloud Auth'].accessToken = 'client';

// Main of our Application
app.get("/", function(req, res){
    // Authenticate
    client.loginClientCredentialsGrant(clientId, redirectURI)
    .then(function(){
        // You're authenticated!
        console.log("Just got authenticated!\n\n");
      //   var opts = {
      //     'pageSize': 25, // Number | Page size
      //     'pageNumber': 1, // Number | Page number
      //     'id': ["id_example"], // [String] | id
      //     'sortOrder': "ASC", // String | Ascending or descending sort order
      //     'expand': ["expand_example"], // [String] | Which fields, if any, to expand
      //     'state': "active" // String | Only list users of this state
      // };
      usersApi.getUsersMe(opts)
      .then(function(data) {
        console.log(`getUsers success! data: ${JSON.stringify(data, null, 2)}`);
    })
      .catch(function(error) {
        console.log('There was a failure calling getUsers');
        console.error(error);
    });
  })
    .then(function(data) {
        // Handle successful result!
        res.redirect("/home");
    })
    .catch(function(response) {
        // Handle failure response
        console.log(`${response.status} - ${response.error.message}`);
        console.log(response.error);
    });
});

app.get("/home", function(req, res){
    res.redirect("/home.html");
});

// Start server with our Express Middleware on port 8085
var httpServer = http.createServer(app);
httpServer.listen('8085');