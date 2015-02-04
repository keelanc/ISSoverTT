ISSoverTT
===============
_by Keelan Chu For_

A twitterbot ([@ISSoverTT](https://twitter.com/issovertt)). Tweets when the International Space Station will be above Trinidad & Tobago and includes an image from the ISS when directly overhead. Uses [Open Notify](http://open-notify.org/) for predictions, and [ISS HD Earth Viewing Experiment](http://www.ustream.tv/channel/iss-hdev-payload) with the [Snapito API](http://snapito.io/) for images.

I host the bot on [Heroku](https://dashboard.heroku.com/home) and keep it awake using [Uptime Robot](https://uptimerobot.com/). You can see it working [here](http://issovertt.herokuapp.com/).

Requires [node](http://nodejs.org/). You also need a Twitter and Snapito API credentials (<https://dev.twitter.com/apps/new>).
See <https://devcenter.heroku.com/articles/config-vars> for help passing the API keys to Heroku.

To install dependencies and run script locally:

    $ npm install
    $ node ISSoverTT.js
    
Enjoy!
<br />    
    
##Known Issues
- Replace Snapito (service no longer exists).
- Reduce number of tweets.

## Licence

Copyright (C) 2014 Keelan Chu For

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

You may contact the author at kkchufor@gmail.com
