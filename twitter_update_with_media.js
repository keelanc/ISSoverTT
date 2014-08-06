// Supplements the node package 'Twit' which currently lacks support for:
// POST statuses/update_with_media
// https://gist.github.com/keelanc/171271ccdfadb8bb64a9


(function() {
  var request, twitter_update_with_media;
 
  request = require('request');
 
  twitter_update_with_media = (function() {
    function twitter_update_with_media(auth_settings) {
      this.auth_settings = auth_settings;
      this.api_url = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
    }
 
    twitter_update_with_media.prototype.post = function(status, imageUrl, callback) {
      var form, r;
      r = request.post(this.api_url, {
        oauth: this.auth_settings
      }, callback);
      form = r.form();
      form.append('status', status);
      return form.append('media[]', request(imageUrl));
    };
 
    return twitter_update_with_media;
 
  })();
 
  module.exports = twitter_update_with_media;
 
}).call(this);