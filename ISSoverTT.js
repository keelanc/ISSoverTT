// ISSoverTT.js

/*var http = require('http'); //add the http module
var express = require('express');
var app = express();
var myServer = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello");
    response.end();
}); //create a server

myServer.listen(3000); //listen on port 3000
console.log("Go to http:localhost:3000 on your browswer");
console.log("Ctrl+C to quit");
*/

var moment = require('moment');
var request = require('request');
//var Twit = require('twit');
// does Heroku require a response to http requests?
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello Express');
}); //routing

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
/*
// twitter app info
var T = new Twit({
     consumer_key:          '',
     consumer_secret:       '',
     access_token:          '',
     access_token_secret:   ''
});

var statement = 'testing';
T.post('statuses/update', { status: statement}, function(err, reply) {
       console.log("error: " + err);
       console.log("reply: " + reply);
       });
*/
/*
var url = 'http://api.open-notify.org/iss-pass.json?lat=10.67&lon=-61.52&alt=25&n=1&callback=';

(function whenISS () {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            //console.log(body) // print the json response
            var date = body.response[0].risetime;
            //console.log(date)
            //console.log(moment.unix(date).toDate());
            console.log(
                'The ISS will be over T&T',
                moment.unix(date).fromNow(),
                '(' + moment.unix(date).zone('-04:00').format('h:mm a'),
                'EDT)'
            );
        }
    });
    setTimeout(whenISS, 5000);
 })();
*/
