let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const { expect } = require("chai");
const server = require("../app");

//assertion style
chai.should();

chai.use(chaiHttp);

/**
 * Test the GET route
 */

describe("Passenger API", () => {
  describe("GET /passengers", () => {
    it("It Should Get All The Passenger", (done) => {
      chai
        .request("http://localhost:7002")
        .get("/passengers")
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
    it("It Should NOT GET All The Passenger", (done) => {
      chai
        .request("http://localhost:7002")
        .get("/passengerssss")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

/**
 * Test the GET(by ID) route
 */
describe("GET passenger/:_id", () => {
  it("It Should GET A Passenger by Id", (done) => {
    const id = "621331cbf732d6a9bd29c272";
    chai
      .request("http://localhost:7002/passenger")
      .get("/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        response.body.should.have.property("name");
        response.body.should.have.property("emailID");
        response.body.should.have.property("trainNo");
        response.body.should.have
          .property("_id")
          .eq("621331cbf732d6a9bd29c272");
        done();
      });
  });
  it("It should NOT GET A Passenger By ID", (done) => {
    const id = "620f5d537bc00186daefa4da";
    chai
      .request("http://localhost:7002/passenger")
      .get("/" + id)
      .end((err, response) => {
        expect(response.body).null;
        done();
      });
  });
});

/**
 * Test the POST route
 */
describe("POST /addPassenger", () => {
  it("It Should POST A New Passenger", (done) => {
    const Passenger = {
      name: "Sreenath",
      emailID: "sreenath22@gmail.com",
      trainNo: "30012",
    };
    chai
      .request("http://localhost:7002")
      .post("/addPassenger")
      .send(Passenger)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
});
