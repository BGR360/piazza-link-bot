/**
 * Slack API will retry messages if they take too long.
 * When a Heroku dyno is starting up, it typically receives
 * the same message 3 times due to this retry, causing the bot
 * to send 3 identical replies. This is a solution to this problem.
 *
 * SECURITY / PRIVACY NOTE:
 * None of the contents of messages are kept in memory longer than needed.
 * Only the unique timestamp and channel id of the message are stored
 * in the previousMessages array.
 */
function RetryFilter (config) {
  this.config = config;
  this.previousMessages = [];

  this.addMessage = addMessage;
  this.filter = filter;
  this.isRetry = isRetry;

  /**
   * Adds a message to the memory and removes an old one if necessary.
   * Returns the message that was popped from the front, if it was, otherwise null.
   */
  function addMessage (message) {
    this.previousMessages.push({
      ts: message.ts,
      channel: message.channel
    });

    // Remove first item of array if array too big
    while (this.previousMessages.length > this.config.retryMemory) {
      let popped = this.previousMessages[0];
      this.previousMessages.shift();
      return popped;
    }

    return null;
  }

  /**
   * Calls callback only if the message is not a repeat,
   * otherwise calls ifRetry
   */
  function filter (message, callback, ifRetry) {
    if (this.isRetry(message)) {
      if (ifRetry !== undefined) {
        ifRetry(message);
      }
    } else {
      callback(message);
    }
  }

  function isRetry (message) {
    if (this.previousMessages.length === 0) {
      return false;
    }

    // Search through to see if any of them have the same timestamp and channel number
    for (let i = 0; i < this.previousMessages.length; i++) {
      let prevMsg = this.previousMessages[i];
      if (prevMsg.ts === message.ts && prevMsg.channel === message.channel) {
        return true;
      }
    }

    return false;
  }
}

module.exports = RetryFilter;
