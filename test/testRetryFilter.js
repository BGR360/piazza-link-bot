/* global describe it */
const assert = require('chai').assert;
const RetryFilter = require('../src/retryfilter');
const config = {
  retryMemory: 5
};

const messages = [
  {
    type: "message",
    channel: "C123",
    user: "U0",
    text: "Message 0",
    ts: "100.00"
  },

  // Three messages with same timestamp but different channel
  {
    type: "message",
    channel: "C123",
    user: "U0",
    text: "Message 1",
    ts: "100.01"
  },
  {
    type: "message",
    channel: "C242",
    user: "U0",
    text: "Message 2",
    ts: "100.01"
  },
  {
    type: "message",
    channel: "C999",
    user: "U0",
    text: "Message 3",
    ts: "100.01"
  },

  {
    type: "message",
    channel: "C123",
    user: "U0",
    text: "Message 4",
    ts: "200.12"
  },
  {
    type: "message",
    channel: "C123",
    user: "U0",
    text: "Message 4",
    ts: "200.12"
  },
];

function feedNMessages (retryFilter, beginIndex, n) {
  for (let i = beginIndex; i < beginIndex + n; i++) {
    retryFilter.addMessage(messages[i]);
  }
}

describe('RetryFilter', function () {
  let retryFilter;

  beforeEach(function () {
    retryFilter = new RetryFilter(config);
  });

  it('should pop off elements when it reaches max capacity', function () {
    let firstMessage = {
      ts: messages[0].ts,
      channel: messages[0].channel
    };
    let secondMessage = {
      ts: messages[1].ts,
      channel: messages[1].channel
    };

    feedNMessages(retryFilter, 0, 5);
    
    let popped = retryFilter.addMessage(messages[5]);
    assert.deepEqual(firstMessage, popped);

    popped = retryFilter.addMessage(messages[5]);
    assert.deepEqual(secondMessage, popped);
  });

  it('should work with zero retryMemory', function () {
    retryFilter = new RetryFilter({
      retryMemory: 0
    });
    feedNMessages(retryFilter, 0, 5);
    assert.isFalse(retryFilter.isRetry(messages[0]));
    assert.isFalse(retryFilter.isRetry(messages[1]));
    assert.isFalse(retryFilter.isRetry(messages[2]));
    assert.isFalse(retryFilter.isRetry(messages[3]));
    assert.isFalse(retryFilter.isRetry(messages[4]));
    assert.isFalse(retryFilter.isRetry(messages[5]));
  });

  describe('#isRetry', function () {
    it('should return false if no messages have been received', function () {
      assert.isFalse(retryFilter.isRetry(messages[0]));
    });

    it('should return true when searching for a repeat message', function () {
      feedNMessages(retryFilter, 0, 1);
      assert.isTrue(retryFilter.isRetry(messages[0]));
    });

    it('should return false when message has not been received', function () {
      feedNMessages(retryFilter, 0, 1);
      assert.isFalse(retryFilter.isRetry(messages[3]));
    });

    it('should return true when multiple messages have same timestamp', function () {
      feedNMessages(retryFilter, 0, 5);
      assert.isTrue(retryFilter.isRetry(messages[1]));
      assert.isTrue(retryFilter.isRetry(messages[2]));
      assert.isTrue(retryFilter.isRetry(messages[3]));
    });

    it('should return false if timestamp matches but channel does not', function () {
      let msg = {
        type: "message",
        channel: "C4343434343",
        user: "U0",
        text: "Almost the same message",
        ts: "100.01"
      };
      feedNMessages(retryFilter, 0, 5);
      assert.isFalse(retryFilter.isRetry(msg));
    });

    it('should return false if channel matches but timestamp does not', function () {
      let msg = {
        type: "message",
        channel: "C123",
        user: "U0",
        text: "Almost the same message",
        ts: "111.111"
      };
      feedNMessages(retryFilter, 0, 5);
      assert.isFalse(retryFilter.isRetry(msg));
    });
  });

  describe('#filter', function () {
    it('should call callback when message is not a repeat', function (done) {
      feedNMessages(retryFilter, 0, 5);
      const ifOkay = (msg) => {
        assert.deepEqual(msg, messages[5]);
        done();
      };
      const ifRetry = (msg) => {
        done(false);
      };
      retryFilter.filter(messages[5], ifOkay, ifRetry);
    });

    it('should call ifRetry when message is a repeat', function (done) {
      feedNMessages(retryFilter, 0, 5);
      let message = null;
      const ifOkay = (msg) => {
        done(false);
      };
      const ifRetry = (msg) => {
        assert.equal(messages[0], msg);
        done();
      };
      retryFilter.filter(messages[0], ifOkay, ifRetry);
    });
  });
});
