`piazza-link-bot`: slackbot to auto-link to Piazza posts
==============================================

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Simple slackbot for responding to messages matching a Piazza post number.

Based on [regexbot](https://github.com/sjmelia/regexbot) by sjmelia.

Full instructions
-----

### Create Slack App

1. Go to https://api.slack.com/apps, create a new App, and connect it to the workspace of your choice.
1. Add a bot user to your app.
1. Install your app to your workspace in its current state (in order to generate access tokens).
1. Go to "OAuth and Permissions" to find your Bot User OAuth access token. This will be the `SLACK_API_TOKEN` used by the Heroku app.
1. Go to "Basic Information" to find your Signing Secret. This will be the `SIGNING_SECRET` used by the Heroku app.

### Set up Heroku App

1. Click the "Deploy to Heroku" button and choose a name for your Heroku app.
1. Fill in all of the required environment variables (e.g. slack api token, piazza base url).
1. Deploy the app.

### Link Slack Events to the Heroku App

1. Go to Event Subscriptions, enable events, and connect it to your Heroku app's url. The path for events is `/slack/events`.
1. Add the following **Bot** event subscriptions:
- `message.channels`
- `message.groups`
- `message.im`
- `message.mpim`
1. Reinstall the app

**Finally, in your Slack workspace, invite the bot user to any channels you wish it to have access to.**


Real-Time Messaging API vs. Events API
--------------------------------------

By default, this bot uses the Slack Real-Time Messaging API to listen and respond to messages. If your bot is running on a Heroku free-tier dyno, this will not work, as the API relies on persistent websockets. Instead, you may use the more traditional Events API, which uses HTTP requests that can wake up your dyno. Simply modify the proper values in `config.js` to enable this.

Development
-----------

`npm test` to lint and run tests
