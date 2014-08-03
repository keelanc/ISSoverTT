// ISSoverTT.js

var moment = require('moment');
var request = require('request');
var Twit = require('twit');
// does Heroku require a response to http requests?
var express = require('express');
var app = express();

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

var url = 'http://api.open-notify.org/iss-pass.json?lat=10.67&lon=-61.52&alt=25&n=1&callback=';
var message = '';
var soon = false;
var longtweet;
var tweetintset = false;

// tweet every 5 hours until less than 15 minutes then tweet once
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
            var then = moment.unix(date);
            var now = moment();
            if (!soon && Number(then.diff(now, 'minutes')) < 15) {
                clearInterval(longtweet);
                tweetintset = false;
                soon = true; // avoid tweeting more than once while <15
                message =
                    'The ISS will be over T&T ' +
                    then.fromNow() + '!';
                tweetit();
            } else if (Number(then.diff(now, 'minutes')) >= 15) {
                soon = false;
                message =
                    'The ISS will be over T&T ' +
                    then.fromNow() +
                    ' (' + then.zone('-04:00').format('h:mm a') +
                    ' EDT)';
                if (!tweetintset) {
                    tweetit();
                    longtweet = setInterval(tweetit, 5*60*60000);
                    tweetintset = true;
                }
            }
        }
    });
    setTimeout(whenISS, 5000); // check ISS every 5 minutes
})();

// twitter app info
var T = new Twit({
     consumer_key:          process.env.TWIT_KEY,
     consumer_secret:       process.env.TWIT_SECRET,
     access_token:          process.env.TWIT_TOKEN,
     access_token_secret:   process.env.TWIT_TOKENSECRET
 });

function tweetit() {
    console.log(message);
    
    T.post('statuses/update', { status: message }, function(err, data, response) {
        //console.log(data)
           console.log("error: " + err)
    })
}

app.get('/', function(req, res) {
        res.send(
                 '<p>Hello World</p>' +
                 message
                 );
        }); //routing

