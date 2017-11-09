//Node Modules
var http = require("http");
var express = require('express');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

//line used for prompting and conversationV1 is used to connect to the watson api
var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: '5545e576-41bf-4642-b62c-8c3486b0ec64', //username from service key
  password: 'yYiXZxLpkTHQ', //password from service key
  path: { workspace_id: 'edb0ed31-4a6c-45fc-b7a8-04401d987574' }, //workspace ID
  version_date: '2017-05-26'
});

var app = express();
var sessionMap = {};

// Express Middleware - dependencies for Express app
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(authvalidation);
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
      usersApi.getUsers(opts)
      .then(function(data) {
        console.log(`getUsers success! data: ${JSON.stringify(data, null, 2)}`);
    })
      .catch(function(error) {
        console.log('There was a failure calling getUsers');
        console.error(error);
    });
  })
    .then(function(permissions) {
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
    //res.redirect("/my_info.html");
	conversation.message({}, processResponse);

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  var endConversation = false;

  // Check for action flags.
  if (response.output.action === 'display_time') {
    // User asked what time it is, so we output the local system time.
    console.log('The current time is ' + new Date().toLocaleTimeString());
  } else if (response.output.action === 'end_conversation') {
    // User said goodbye, so we're done.
    console.log(response.output.text[0]);
    endConversation = true;
  } else {
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
    }
  }

  // If we're not done, prompt for the next round of input.
  if (!endConversation) {
    var newMessageFromUser = prompt('>> ');
    conversation.message({
      input: { text: newMessageFromUser },
      // Send back the context to maintain state.
      context : response.context,
    }, processResponse)
  }
}
});

// Start server with our Express Middleware on port 8085
var httpServer = http.createServer(app);
httpServer.listen('8085');