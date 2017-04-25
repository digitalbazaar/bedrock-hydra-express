/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* globals should */
'use strict';

const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const helpers = require('./helpers');
const expect = global.chai.expect;
let request = require('request');
request = request.defaults({json: true, strictSSL: false});
const url = require('url');
const uuid = require('uuid/v4');

const urlObj = {
  protocol: 'https',
  host: config.server.host,
  pathname: ''
};

describe('Books', () => {
  before(() => {
    urlObj.pathname = '/book';
  });
  describe('POST', () => {
    it('does a POST on /book', done => {
      const mockValue = uuid();
      request({
        method: 'POST',
        body: {
          bookProperty: mockValue
        },
        url: url.format(urlObj)
      }, (err, res, body) => {
        expect(err).to.not.be.ok;
        res.statusCode.should.equal(201);
        body.should.be.an('object');
        should.exist(body.id);
        should.exist(body.bookProperty);
        body.bookProperty.should.equal(mockValue);
        done();
      });
    });
  }); // end /book
  describe('GET', () => {
    beforeEach(done => helpers.removeCollections(done));

    it('does a GET on /book', done => {
      const mockValue = uuid();
      async.series([
        callback => request({
          method: 'POST',
          body: {
            bookProperty: mockValue
          },
          url: url.format(urlObj)
        }, callback),
        callback => request({
          method: 'GET',
          url: url.format(urlObj)
        }, (err, res, body) => {
          expect(err).to.not.be.ok;
          res.statusCode.should.equal(200);
          body.should.be.an('array');
          body.should.have.length(1);
          body[0].bookProperty.should.equal(mockValue);
          callback();
        })
      ], done);
    });
    it('does a GET on /book/x', done => {
      const mockValue = uuid();
      async.auto({
        insert: callback => request({
          method: 'POST',
          body: {
            bookProperty: mockValue
          },
          url: url.format(urlObj)
        }, (err, res, body) => callback(err, body)),
        test: ['insert', (results, callback) => {
          request({
            method: 'GET',
            url: results.insert.id
          }, (err, res, body) => {
            expect(err).to.not.be.ok;
            body.bookProperty.should.equal(mockValue);
            callback();
          });
        }]
      }, done);

    }); // end GET
  }); // end /book
});

describe('Book Reviews', () => {
  describe('Post', () => {
    it('Creates a book and a review', done => {
      const mockValue = uuid();
      async.auto({
        insertBook: callback => request({
          method: 'POST',
          body: {
            bookProperty: uuid()
          },
          url: url.format(urlObj)
        }, (err, res, body) => callback(err, body)),
        insertReview: ['insertBook', (results, callback) => request({
          method: 'POST',
          body: {
            reviewProperty: mockValue
          }, url: results.insertBook.id + '/review'
        }, (err, res, body) => callback(err, body))],
        getReview: ['insertReview', (results, callback) => {
          request({
            method: 'GET',
            url: results.insertReview.id
          }, (err, res, body) => {
            expect(err).to.not.be.ok;
            body.reviewProperty.should.equal(mockValue);
            callback();
          });
        }]
      }, done);
    });
  });
});

describe('/private endpoint requires authentication', () => {
  before(() => {
    urlObj.pathname = '/private';
  });
  describe('GET', () => {
    describe('Unauthenticated Request', () => {
      it('returns PermissionDenied', done => {
        // console.log('urlObj', urlObj);
        request({
          method: 'GET',
          url: url.format(urlObj)
        }, (err, res, body) => {
          expect(err).to.not.be.ok;
          res.statusCode.should.equal(400);
          body.type.should.equal('PermissionDenied');
          done();
        });
      });
    });
  });
});
