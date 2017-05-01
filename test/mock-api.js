/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const api = {};
module.exports = api;

api.docs = {
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "xmls": "http://www.w3.org/2001/XMLSchema#",
    "owl": "http://www.w3.org/2002/07/owl#",
    "domain": {
      "@id": "rdfs:domain",
      "@type": "@id"
    },
    "range": {
      "@id": "rdfs:range",
      "@type": "@id"
    },
    "subClassOf": {
      "@id": "rdfs:subClassOf",
      "@type": "@id"
    },
    "expects": {
      "@id": "hydra:expects",
      "@type": "@id"
    },
    "returns": {
      "@id": "hydra:returns",
      "@type": "@id"
    },
    "hydra:member": {
      "@id": "hydra:member",
      "@type": "@id"
    }
  },
  "@id": "/docs.jsonld",
  "hydra:title": "API Platform's demo",
  "hydra:description": "A test",
  "hydra:entrypoint": "/",
  "hydra:supportedClass": [
    {
      "@id": "http://schema.org/BookCollection",
      "@type": "hydra:Class",
      "rdfs:label": "Book Collection",
      "hydra:title": "Book Collection",
      "hydra:member": "http://schema.org/Book"
    },
    {
      "@id": "http://schema.org/Book",
      "@type": "hydra:Class",
      "rdfs:label": "Book",
      "hydra:title": "Book",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/isbn",
            "@type": "rdf:Property",
            "rdfs:label": "isbn",
            "domain": "http://schema.org/Book",
            "range": "xmls:string"
          },
          "hydra:title": "isbn",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The ISBN of the book"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/name",
            "@type": "rdf:Property",
            "rdfs:label": "name",
            "domain": "http://schema.org/Book",
            "range": "xmls:string"
          },
          "hydra:title": "name",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The name of the item"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/description",
            "@type": "rdf:Property",
            "rdfs:label": "description",
            "domain": "http://schema.org/Book",
            "range": "xmls:string"
          },
          "hydra:title": "description",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "A description of the item"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/author",
            "@type": "rdf:Property",
            "rdfs:label": "author",
            "domain": "http://schema.org/Book",
            "range": "xmls:string"
          },
          "hydra:title": "author",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/dateCreated",
            "@type": "rdf:Property",
            "rdfs:label": "dateCreated",
            "domain": "http://schema.org/Book",
            "range": "xmls:dateTime"
          },
          "hydra:title": "dateCreated",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "/review",
            "@type": "hydra:Link",
            "domain": "/book",
            "range": "http://schema.org/ReviewCollection",
            "rdfs:label": "The collection of Review resources",
            "hydra:supportedOperation": [
              {
                "@type": "hydra:Operation",
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of Review resources.",
                "rdfs:label": "Retrieves the collection of Review resources.",
                "returns": "http://schema.org/ReviewCollection"
              },
              {
                "@type": "hydra:CreateResourceOperation",
                "expects": "http://schema.org/Review",
                "hydra:method": "POST",
                "hydra:title": "Creates a Review resource.",
                "rdfs:label": "Creates a Review resource.",
                "returns": "http://schema.org/Review"
              }
            ]
          }
        }
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves Book resource.",
          "rdfs:label": "Retrieves Book resource.",
          "returns": "http://schema.org/Book"
        },
        {
          "@type": "hydra:ReplaceResourceOperation",
          "expects": "http://schema.org/Book",
          "hydra:method": "PUT",
          "hydra:title": "Replaces the Book resource.",
          "rdfs:label": "Replaces the Book resource.",
          "returns": "http://schema.org/Book"
        },
        {
          "@type": "hydra:Operation",
          "hydra:method": "DELETE",
          "hydra:title": "Deletes the Book resource.",
          "rdfs:label": "Deletes the Book resource.",
          "returns": "owl:Nothing",
          "schema:permissions": "BOOK_DELETE"
        }
      ]
    },
    {
      "@id": "http://schema.org/ReviewCollection",
      "@type": "hydra:Class",
      "rdfs:label": "Review Collection",
      "hydra:title": "Review Collection",
      "hydra:member": "http://schema.org/Review"
    },
    {
      "@id": "http://schema.org/Review",
      "@type": "hydra:Class",
      "rdfs:label": "Review",
      "hydra:title": "Review",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/reviewBody",
            "@type": "rdf:Property",
            "rdfs:label": "reviewBody",
            "domain": "http://schema.org/Review",
            "range": "xmls:string"
          },
          "hydra:title": "reviewBody",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The actual body of the review"
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Review/rating",
            "@type": "rdf:Property",
            "rdfs:label": "rating",
            "domain": "http://schema.org/Review",
            "range": "xmls:integer"
          },
          "hydra:title": "rating",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true
        }
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves Review resource.",
          "rdfs:label": "Retrieves Review resource.",
          "returns": "http://schema.org/Review"
        },
        {
          "@type": "hydra:ReplaceResourceOperation",
          "expects": "http://schema.org/Review",
          "hydra:method": "PUT",
          "hydra:title": "Replaces the Review resource.",
          "rdfs:label": "Replaces the Review resource.",
          "returns": "http://schema.org/Review"
        },
        {
          "@type": "hydra:Operation",
          "hydra:method": "DELETE",
          "hydra:title": "Deletes the Review resource.",
          "rdfs:label": "Deletes the Review resource.",
          "returns": "owl:Nothing"
        }
      ]
    },
    {
      "@id": "http://schema.org/PrivateCollection",
      "@type": "hydra:Class",
      "rdfs:label": "Private Collection",
      "hydra:title": "Private Collection",
      "hydra:member": "http://schema.org/Private"
    },
    {
      "@id": "http://schema.org/Private",
      "@type": "hydra:Class",
      "rdfs:label": "Private",
      "hydra:title": "Private",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/privateBody",
            "@type": "rdf:Property",
            "rdfs:label": "privateBody",
            "domain": "http://schema.org/Private",
            "range": "xmls:string"
          },
          "hydra:title": "privateBody",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The actual body of the private thing"
        }
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves Private resource.",
          "rdfs:label": "Retrieves Private resource.",
          "returns": "http://schema.org/Private"
        }
      ]
    },
    {
      "@id": "#Entrypoint",
      "@type": "hydra:Class",
      "hydra:title": "The API entrypoint",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "/book",
            "@type": "hydra:Link",
            "domain": "#Entrypoint",
            "rdfs:label": "The collection of Book resources",
            "range": "http://schema.org/BookCollection",
            "hydra:supportedOperation": [
              {
                "@type": "hydra:Operation",
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of Book resources.",
                "rdfs:label": "Retrieves the collection of Book resources.",
                "returns": "http://schema.org/BookCollection"
              },
              {
                "@type": "hydra:CreateResourceOperation",
                "expects": "http://schema.org/Book",
                "hydra:method": "POST",
                "hydra:title": "Creates a Book resource.",
                "rdfs:label": "Creates a Book resource.",
                "returns": "http://schema.org/Book"
              }
            ]
          },
          "hydra:title": "The collection of Book resources",
          "hydra:readable": true,
          "hydra:writable": false
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "/private",
            "@type": "hydra:Link",
            "domain": "#Entrypoint",
            "rdfs:label": "The collection of Private resources",
            "range": "http://schema.org/PrivateCollection",
            "hydra:supportedOperation": [
              {
                "@type": "hydra:Operation",
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of Private resources.",
                "rdfs:label": "Retrieves the collection of Private resources.",
                "returns": "http://schema.org/PrivateCollection",
                "http://bedrock.dev/middleware": ["ensureAuthenticated"]
              }
            ]
          },
          "hydra:title": "The collection of Private resources",
          "hydra:readable": true,
          "hydra:writable": false
        }
      ],
      "hydra:supportedOperation": {
        "@type": "hydra:Operation",
        "hydra:method": "GET",
        "rdfs:label": "The API entrypoint.",
        "returns": "#EntryPoint"
      }
    }
  ]
};
