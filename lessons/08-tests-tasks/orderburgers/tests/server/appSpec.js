var request = require("supertest");
var app = require("./../../app.js");

describe("The app", function () {

  it("should return 200 OK on GET /", function (done) {
    request(app)
      .get("/")
      .expect(200, done);
  });
  it("should respond with the correct HTML on GET /", function (done) {
    request(app)
      .get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Content-Length", "472", done);
  });

  it("should return 200 OK on GET /ingredients", function (done) {
    request(app)
      .get("/ingredients")
      .expect(200, done);
  });
  it("should respond with the correct HTML on GET /ingredients", function (done) {
    request(app)
      .get("/ingredients")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Content-Length", "5402", done);
  });

  it("should return 200 OK on GET /order", function (done) {
    request(app)
      .get("/order")
      .expect(200, done);
  });
  it("should respond with the correct HTML on GET /order", function (done) {
    request(app)
      .get("/order")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Content-Length", "2574", done);
  });

  it("should return 200 OK on GET /kitchen", function (done) {
    request(app)
      .get("/kitchen")
      .expect(200, done);
  });
  it("should respond with the correct HTML on GET /kitchen", function (done) {
    request(app)
      .get("/kitchen")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Content-Length", "481", done);
  });

  it("should return 404 on GET /notaroute", function (done) {
    request(app)
      .get("/notaroute")
      .expect(404, done);
  });

});
