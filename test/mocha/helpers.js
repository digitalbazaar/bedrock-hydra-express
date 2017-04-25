/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const database = require('bedrock-mongodb');

const api = {};
module.exports = api;

api.removeCollections = function(callback) {
  const collectionNames = ['http://schema.org/BookCollection'];
  database.openCollections(collectionNames, () => {
    async.each(collectionNames, (collectionName, callback) => {
      database.collections[collectionName].remove({}, callback);
    }, function(err) {
      callback(err);
    });
  });
};
