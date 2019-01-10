`piazza-link-bot`: slackbot to auto-link to Piazza posts
==============================================

Simple slackbot for responding to messages matching a Piazza post number.

Based on [regexbot](https://github.com/sjmelia/regexbot) by sjmelia.

Setup
-----

1. Create a [new bot user](https://my.slack.com/services/new/bot) to get a slack api token.
2. Set the `SLACK_API_TOKEN`, `PIAZZA_BASE_URL`, and (if using Events API), `SLACK_SIGNING_SECRET` environment variables (or set them manually in `config.js`, just be sure not to commit this file!).
3. `npm install && npm start`
4. Try it out on a slack channel!

Real-Time Messaging API vs. Events API
--------------------------------------

By default, this bot uses the Slack Events API to listen to messages. This allows the bot to work on free-tier Heroku dynos, for example, because it uses HTTP requests rather than websockets. If you have a persistent server and would like to use the Slack Real-Time Messaging API instead, set the `USE_RTM` environment variable (to anything).

Development
-----------

`npm test` to lint and run tests
