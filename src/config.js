/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
const process = require('process');

var config = {
  slack_api_token: process.env['SLACK_API_TOKEN'],

  // The URL of your Piazza class.
  piazza_base_url: process.env['PIAZZA_BASE_URL'],

  // Should the bot reply as a thread? If not, just sends a message to the channel.
  // If the message that triggers the bot is already in a thread, then the bot
  // will always respond to that thread, no matter the value of this setting.
  reply_as_thread: process.env['REPLY_AS_THREAD'] || false,

  // Whether or not to use the Slack Real-Time Messaging API instead of the Events API.
  use_rtm: process.env['USE_RTM'] || false,

  // If using the Events API, then configure the following:
  events: {
    port: process.env['PORT'] || 8888,
    signing_secret: process.env['SLACK_SIGNING_SECRET']
  },

  /** No need to modify anything below this **/

  regexes: [],

  schedules: [],

  // Number of message ids to keep in memory in order to prevent duplicate replies.
  retryMemory: process.env['RETRY_MEMORY'] || 100,

  build: function (id) {
    this.regexes.push({ regex: /@(\d+)/g, message: this.piazza_base_url + '?cid=[1]' });
  }
};
module.exports = config;
