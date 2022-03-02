let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const { expect } = require("chai");
const server = require("../app");

/**assertion style*/
chai.should();

chai.use(chaiHttp);

/**
 * Test the GET route
 */

describe("Food API", () => {
  describe("GET /getAllMeal", () => {
    it("It Should Get All The Meals", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/getAllMeal")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("It Should NOT GET All The Foods", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/getfoodsss")
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
describe("GET getMealByID/:_id", () => {
  it("It Should GET A Meal by Id", (done) => {
    const id = "6210e4fa07349e702991cfd3";
    chai
      .request("http://localhost:8000/getMealByID")
      .get("/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        response.body.should.have.property("MealName");
        response.body.should.have.property("Category");
        response.body.should.have.property("Price");
        response.body.should.have
          .property("_id")
          .eq("6210e4fa07349e702991cfd3");
        done();
      });
  });
  it("It should NOT GET A Food By ID", (done) => {
    const id = "620f5d537bc00186daefa4da";
    chai
      .request("http://localhost:8000/getMealByID")
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
describe("POST /addFood", () => {
  it("It Should POST A New Meal", (done) => {
    const Meal = {
      MealName: "Burger",
      Category: "Non-Veg",
      price: 300,
    };
    chai
      .request("http://localhost:8000")
      .post("/addMeal")
      .send(Meal)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
});
