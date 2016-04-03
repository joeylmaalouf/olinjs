var request = require("supertest");
var app = require("./../../app.js");

describe("The server", function () {

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
      .expect("Content-Type", "text/html; charset=utf-8", done);
      /* We pointed you guys towards checking content length in the cat app example,
         and we were kind of wrong to do so. Fine to check content length on pages with
         fixed contents, but most pages have variable contents -- e.g. the cats page
         varies in length depending on how many cats you have, their names, their ages, etc;
         same for this ingredients page. I'm guessing 5402 was the correct content length
         for the page as it looked when you wrote the test -- but my database state is different
         from yours, so it fails for me. Best to take out content length altogether here -- apologies
         for the misleading example!
      .expect("Content-Length", "5402", done);*/
  });

  it("should return 200 OK on GET /order", function (done) {
    request(app)
      .get("/order")
      .expect(200, done);
  });
  it("should respond with the correct HTML on GET /order", function (done) {
    request(app)
      .get("/order")
      .expect("Content-Type", "text/html; charset=utf-8", done); // same here
      // .expect("Content-Length", "2574", done);
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
      .expect("Content-Length", "481", done); // probably same here? kitchen page is variable
  });

  // How could you have tested the POST routes?

  it("should return 404 on GET /notaroute", function (done) {
    request(app)
      .get("/notaroute")
      .expect(404, done);
  });

});
