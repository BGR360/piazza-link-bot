`piazza-link-bot`: slackbot to auto-link to Piazza posts
==============================================

Simple slackbot for responding to messages matching a Piazza post number.

Based on [regexbot](https://github.com/sjmelia/regexbot) by sjmelia.

Setup
-----

1. Create a [new bot user](https://my.slack.com/services/new/bot) to get a slack api token.
2. `cp config.js.example src/config.js`
3. Edit `src/config.js` to have your slack api token and Piazza base URL.
4. `npm install && npm start`
5. Try it out on a slack channel!

Real-Time Messaging API vs. Events API
--------------------------------------

By default, this bot uses the Slack Real-Time Messaging API to listen and respond to messages. If your bot is running on a Heroku free-tier dyno, this will not work, as the API relies on persistent websockets. Instead, you may use the more traditional Events API, which uses HTTP requests that can wake up your dyno. Simply modify the proper values in `config.js` to enable this.

Development
-----------

`npm test` to lint and run tests
