//Node Modules
var http = require("http");
var express = require('express');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

// Hardcoded variables
var client_id = '73303454-f95d-4f29-8f44-88668188af19';
var client_secret = 'sZF-yCB0BsaZs6RSuErsjGskO0ouMkjob4elLBjqVSs';

var app = express();
var sessionMap = {};

// Validation function
var authvalidation = function(req, res, next) {
    console.log('\n['+req.method+' '+req.url+']');

    //if we don't have a session then redirect them to the login page
    if((req.cookies && !(req.cookies.session && sessionMap[req.cookies.session])) &&
            req.url.indexOf("oauth") == -1){

        // Redirect the user to authorize with purecloud - we receive an authCode to use for subsequent requests
        var redirectUri = "https://login.mypurecloud.com/oauth/authorize?" +
                    "response_type=code" +
                    "&client_id=" + client_id
                    + "&redirect_uri=http://localhost:8085/oauth/callback";

        console.log("redirecting to " + redirectUri);
        res.redirect(redirectUri);  // Cause users browser to redirect to PureCloud

        return;
    }

    //if we do have a session, just pass along to the next http handler
    console.log("have session")
    next();
}

// Express Middleware - dependencies for Express app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authvalidation);
app.use(express.static(__dirname));

// Main of our Application
app.get("/", function(req, res){
    res.redirect("/my_info.html");
})

// This route handles the oauth callback once the user has signed in!
app.get("/oauth/callback", function(req,res){
    // The authorization page has called this callback and now we need to get the bearer token
    console.log("oauth callback")
    console.log(req.query.code)

    // Code we're trying to get back from PureCloud - pull as a request off request
    var authCode = req.query.code;

    // Build the Authorization form
    var tokenFormData = {
        grant_type: "authorization_code",
        code: authCode, //from the query string parameters sent to this url
        redirect_uri : "http://localhost:8085/oauth/callback"
    }

    // Build the Authorization post
    var postData = {
        url:'https://login.mypurecloud.com/oauth/token',
        form: tokenFormData,
        auth: { //basic auth here
            user: client_id,
            pass: client_secret
        }
    }

    // Post back to /oauth/token with the client id and secret as well as the auth code that was sent to us.
    request.post(postData, function(err,httpResponse,body){
        console.log("got token data back: ")
        console.log(body);

        var tokenResponse = JSON.parse(body);

        // Create a new session ID to put into our tracked sessions
        // as well as to send back as a cookie
        var sessionId = uuid.v4();

        // Store the session id as a key in the session map, the value is the bearer token for purecloud.
        // We want to keep that secure so won't send that back to the client!
        sessionMap[sessionId] = tokenResponse.access_token;

        // Send the session id back as a cookie
        res.cookie('session', sessionId);
        res.redirect("/my_info");
    });
});

app.get("/my_info", function(req, res){
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
    });
});

// Start server with our Express Middleware on port 8085
var httpServer = http.createServer(app);
httpServer.listen('8085');