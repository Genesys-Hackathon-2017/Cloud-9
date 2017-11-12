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

// Hardcoded variables
var clientId = 'db2dfb7c-54d3-4fa0-9fc8-08d8f7b43eb2';
var clientSecret = '9MAiRG1GxgSkERyWZwiKvJNh0Zr3nuX30Us0sWzwep0';

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
    client.loginClientCredentialsGrant(clientId, clientSecret)
    .then(function(){
        // You're authenticated!
        console.log("AUTHENTICATED!!!");
        var opts = { 
          'pageSize': 25, // Number | Page size
          'pageNumber': 1, // Number | Page number
          'id': ["id_example"], // [String] | id
          'sortOrder': "ASC", // String | Ascending or descending sort order
          'expand': ["expand_example"], // [String] | Which fields, if any, to expand
          'state': "active" // String | Only list users of this state
      };
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
        res.redirect("/my_info");
    })
    .catch(function(response) {
        // Handle failure response
        console.log(`${response.status} - ${response.error.message}`);
        console.log(response.error);
    });
});

app.get("/my_info", function(req, res){
    res.redirect("/my_info.html");
});

// Start server with our Express Middleware on port 8085
var httpServer = http.createServer(app);
httpServer.listen('3000');