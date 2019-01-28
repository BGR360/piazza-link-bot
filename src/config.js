/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
const process = require('process');

var config = {
  slack_api_token: process.env['SLACK_API_TOKEN'],

  // The URL of your Piazza class.
  piazza_base_url: process.env['PIAZZA_BASE_URL'],

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
