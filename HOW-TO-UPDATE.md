# How to Update `piazza-link-bot`

So you've got an outdated Piazza bot, huh? Well don't worry, here's how to quickly update your deployment!

## Method A: Command Line

This is the most straightforward method. It requires that you have the heroku CLI installed.

1. Check to see if any new Environment variables were added in the update. If so, you should update these in your Heroku app's settings before proceeding.
1. Clone the up-to-date `piazza-link-bot` repo to your local machine
    ```
    $ git clone https://github.com/BGR360/piazza-link-bot
    ```
1. Force push the code directly to your Heroku app instance
    ```
    $ heroku login
	$ git remote add heroku https://git.heroku.com/YOUR-PIAZZA-LINK-BOT-APP-NAME.git
	$ git push -f heroku master
    ```

## Method B: Fork and Browser

If you really don't wanna install Heroku CLI, then you can try this method.

1. Check to see if any new Environment variables were added in the update. If so, you should update these in your Heroku app's settings before proceeding.
1. Fork this repo to your GitHub account.
1. Go to your heroku dashboard and click on your piazza link bot app.
1. Go to the "Deploy" menu.
1. Under "Deployment method", select GitHub as the option.
1. Grant Heroku permissions.
1. Select your fork of the repo and use that to deploy.
