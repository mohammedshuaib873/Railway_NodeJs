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

describe("Order API", () => {
  describe("GET /getAllOrders", () => {
    it("It Should Get All The Orders", (done) => {
      chai
        .request("http://localhost:7001")
        .get("/getAllOrders")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("It Should NOT GET All The Orders", (done) => {
      chai
        .request("http://localhost:7001")
        .get("/getAllOrderssss")
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
describe("GET order/:_id", () => {
  it("It Should GET A Order by Id", (done) => {
    const id = "621478c62a14099c8c1e04c6";
    chai
      .request("http://localhost:7001/order")
      .get("/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("PassengerName");
        response.body.should.have.property("MealName");
        response.body.should.have.property("Category");
        done();
      });
  });
});

/**
 * Test the POST route
 */
describe("POST /orderMeal", () => {
  it("It Should POST A Order", (done) => {
    const OrderMeal = {
      passengerName: "Shuaib",
      category: "Veg",
      slot: "Lunch",
      quantity: "2nos",
      seatNo: "A34",
      amount: 300,
    };
    chai
      .request("http://localhost:7001")
      .post("/orderMeal")
      .send(OrderMeal)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
});
