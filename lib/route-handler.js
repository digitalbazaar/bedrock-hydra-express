/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const bedrock = require('bedrock');

class RouteHandler {

  constructor(op, options) {
    // FIXME: basic validation on `op` param
    this.op = op;
    this.collection = options.collection;
    this._middleware = [];
  }

  initMiddleware(callback) {
    // FIXME: determine what URL should be used for this in place of bedrock.dev
    if(!this.op['http://bedrock.dev/middleware']) {
      return callback();
    }
    async.eachSeries(
      [].concat(this.op['http://bedrock.dev/middleware']), (m, callback) =>
        bedrock.events.emit(
          'bedrock-hydra-express.' + m, this._middleware, callback)
      , callback);
  }

  get middleware() {
    return this._middleware;
  }
}

module.exports = RouteHandler;
