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
    const self = this;
    // FIXME: determine what URL should be used for this in place of bedrock.dev
    if(!self.op['http://bedrock.dev/middleware']) {
      return callback();
    }
    async.eachSeries(
      [].concat(self.op['http://bedrock.dev/middleware']), (m, callback) =>
        bedrock.events.emit(
          'bedrock-hydra-express.' + m, self._middleware, callback)
      , callback);
  }

  static getItemName(item) {
    if(!item.includes('/')) {
      return item;
    }
    return item.substring(item.lastIndexOf('/') + 1).toLowerCase();
  }

  get middleware() {
    return this._middleware;
  }
}

module.exports = RouteHandler;
