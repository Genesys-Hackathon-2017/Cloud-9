var http = require("http");

var express = require('express');
var app = express();
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

<<<<<<< Updated upstream
var client_id = '73303454-f95d-4f29-8f44-88668188af19';
var client_secret = 'sZF-yCB0BsaZs6RSuErsjGskO0ouMkjob4elLBjqVSs';

var authvalidation = function(req, res, next) {
    console.log('\n['+req.method+' '+req.url+']');
    //if we don't have a session then redirect them to the login page
    if((req.cookies && !(req.cookies.session && sessionMap[req.cookies.session])) &&
            req.url.indexOf("oauth") == -1){
        //redirect the user to authorize with purecloud
        var redirectUri = "https://login.mypurecloud.com/oauth/authorize?" +
                    "response_type=code" +
                    "&client_id=" + client_id +
                    "&redirect_uri=http://localhost:8085/oauth2/callback";

        console.log("redirecting to " + redirectUri);
        res.redirect(redirectUri);

        return;
    }

    //if we do have a session, just pass along to the next http handler
    console.log("have session")
    next();
}
||||||| merged common ancestors
var app = express();
var sessionMap = {};
=======
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
>>>>>>> Stashed changes

app.use(bodyParser.json());
app.use(cookieParser());
app.use(authvalidation);
app.use(express.static(__dirname));

var sessionMap ={};

app.get("/", function(req, res){
    res.redirect("/my_info.html");
})

//this route handles the oauth callback
app.get("/oauth2/callback", function(req,res){
    //the authorization page has called this callback and now we need to get the bearer token
    console.log("oauth callback")
    console.log(req.query.code)
    var authCode = req.query.code;

    var tokenFormData = {
        grant_type: "authorization_code",
        code: authCode, //from the query string parameters sent to this url
        redirect_uri : "http://localhost:8085/oauth2/callback"
    }

    var postData = {
        url:'https://login.mypurecloud.com/oauth/token',
        form: tokenFormData,
        auth: { //basic auth here
            user: client_id,
            pass: client_secret
        }
    }

    //post back to /oauth/token with the client id and secret as well as the auth code that was sent to us.
    request.post(postData, function(err,httpResponse,body){
        console.log("got token data back: ")
        console.log(body);

        var tokenResponse = JSON.parse(body);

        var sessionId = uuid.v4();

        //store the session id as a key in the session map, the value is the bearer token for purecloud.
        //we want to keep that secure so won't send that back to the client
        sessionMap[sessionId] = tokenResponse.access_token;

        //send the session id back as a cookie
        res.cookie('session', sessionId);
        res.redirect("/my_info.html");

    });
});

<<<<<<< Updated upstream
//wrap up the api/v2/users/me call inside a /me route
app.get("/me", function(req, res){
    //get the session from map using the cookie
    var oauthId = sessionMap[req.cookies.session];

    var getData = {
        url:'https://api.mypurecloud.com/api/v2/users/me',
        auth: {
            bearer: oauthId
        }
    };

    request.get(getData, function (e, r, user) {
        console.log("Got response for /users/me");
        console.log(user);
        console.log(e);
         res.send(user);
    })
||||||| merged common ancestors
app.get("/my_info", function(req, res){
    res.redirect("/my_info.html");
=======
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
>>>>>>> Stashed changes
});

var httpServer = http.createServer(app);
httpServer.listen('8085');