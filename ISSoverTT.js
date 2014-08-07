// ISSoverTT.js

var moment = require('moment');
var request = require('request');
var Twit = require('twit');
var twitter_update_with_media = require('./twitter_update_with_media');
var express = require('express');
var app = express();

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

var url = 'http://api.open-notify.org/iss-pass.json?lat=10.67&lon=-61.52&alt=25&n=1&callback=';
var message = '';
var msoon = false;      // is it <15 mins?
var mnow = false;       // is it now?
var longtweet;          // interval timer for 1tweet/5hrs
var tweetintset = false;// avoid multiple setInterval's


// credentials are specified as Heroku config vars (environment variables)
var T = new Twit({
    consumer_key:          process.env.TWIT_KEY,
    consumer_secret:       process.env.TWIT_SECRET,
    access_token:          process.env.TWIT_TOKEN,
    access_token_secret:   process.env.TWIT_TOKENSECRET
});

var tuwm = new twitter_update_with_media({
    consumer_key:       process.env.TWIT_KEY,
    consumer_secret:    process.env.TWIT_SECRET,
    token:              process.env.TWIT_TOKEN,
    token_secret:       process.env.TWIT_TOKENSECRET
});

ISSimage = 'http://api.snapito.io/v2/webshot/' +
            process.env.SNAPITO_KEY + '?size=sc&freshness=hour&url=' +
            'http%3A%2F%2Fwww.ustream.tv%2Fembed%2F17074538%3Fautoplay%3Dtrue';

// tweet every 5 hours until less than 15 minutes then tweet once
(function whenISS () {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            //console.log(body) // print the json response
            var date = body.response[0].risetime;
            var duration = body.response[0].duration;
            //console.log(date)
            //console.log(moment.unix(date).toDate());
            var mthen = moment.unix(date);  // time ISS is predicted to be above T&T
            var mnow = moment();            // time now
            var mexact = mthen.clone();     // time the ISS will be directly overhead
            mexact.add(duration/2, 'seconds');
            if ( !mnow && Number(mexact.diff(mnow, 'minutes')) < 5 ) {
                clearInterval(longtweet);   // Should be already done in the '<15' case
                tweetintset = false;        // but repeated here incase the Heroku dyno
                                            // is down and the '<15' case is missed.
                mnow = true; // avoid tweeting more than once while 'now'
                message =
                    'The #ISS should be directly overhead #Trinidad';
                tweetwithmedia();
            }
            else if (!msoon && Number(mthen.diff(mnow, 'minutes')) < 15) {
                clearInterval(longtweet);
                tweetintset = false;
                msoon = true; // avoid tweeting more than once while <15
                message =
                    'The #ISS will be over #Trinidad ' +
                    mthen.fromNow() + '!';
                tweetit();
            }
            else if (Number(mthen.diff(mnow, 'minutes')) >= 15) {
                mnow = false;
                msoon = false;
                message =
                    'The #ISS will be over #Trinidad ' +
                    mthen.fromNow() +
                    ' (' + mthen.zone('-04:00').format('h:mm a') +
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


function tweetit() {
    console.log(message);
    
    T.post('statuses/update', { status: message }, function(err, data, response) {
        //console.log(data)
        console.log("error: " + err)
    })
}

function tweetwithmedia() {
    tuwm.post(message, ISSimage, function(err, response) {
        if (err) {
            console.log(err);
        }
        //console.log(response);
    });
}

app.get('/', function(req, res) {
        res.send(
                 '<a href="https://twitter.com/issovertt">@ISSoverTT</a><br/>' +
                 message +
                 moment({hour: 8}).format('dddd, h:mm a') +
                 moment({hour: 18}).format('dddd, h:mm a')
/*+
                 '<br/><img src="' + ISSimage + '">' +
                 '<br/><p>' + mexact.zone('-04:00').format('h:mm a') + '</p>'
//                 '<br/><p>' + duration + '</p>'*/
                 );
        }); //routing

