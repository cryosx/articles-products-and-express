const request = require('supertest');

const server = require('../server.js');
describe('Products', function() {
  describe('GET', function() {
    it('/products', function(done) {
      request(server)
        .get('/products')
        .expect(200, done);
    });
    it('/products/new', function(done) {
      request(server)
        .get('/products/new')
        .expect(200, done);
    });
    it('/products/:id', function(done) {
      request(server)
        .get('/products/1')
        .expect(200, done);
    });
    it('/products/:id/edit', function(done) {
      request(server)
        .get('/products/0/edit')
        .expect(200, done);
    });
  });
  describe('POST', function() {
    it('/products: {"name":"tv","price":"299","inventory":"3"} -> /products', function(done) {
      request(server)
        .post('/products')
        .send('{"name":"tv","price":"299","inventory":"3"}')
        .expect(200, done);
    });

    it('/products: get tv (id:2)', function(done) {
      request(server)
        .get('/products/2')
        .expect(200, done);
    });
  });
  describe('PUT', function() {
    // it('/products', function(done) {
    //   request(server)
    //     .get('/products')
    //     .expect(200, done);
    // });
  });
  describe('DELETE', function() {
    // it('/products', function(done) {
    //   request(server)
    //     .get('/products')
    //     .expect(200, done);
    // });
  });
});

describe('Articles', function() {
  describe('GET', function() {
    it('/articles', function(done) {
      request(server)
        .get('/articles')
        .expect(200, done);
    });
  });
  describe('POST', function() {
    it('/products', function(done) {
      request(server)
        .get('/products')
        .expect(200, done);
    });
  });
  describe('PUT', function() {
    it('/products', function(done) {
      request(server)
        .get('/products')
        .expect(200, done);
    });
  });
  describe('DELETE', function() {
    it('/products', function(done) {
      request(server)
        .get('/products')
        .expect(200, done);
    });
  });
});
