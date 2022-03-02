/**Load Express To Handle and Listen To Request*/
const express = require("express");
/**Load mongoose to Connect Nodejs And MongoDb Atlas */
const mongoose = require("mongoose");
/**Load Body-Parser To Convert Json Data Into String In Postman*/
const bodyParser = require("body-parser");
/**Load Logging To Capture Events*/
const { setupLogging } = require("./Logging/logging");
/**Load SwaggerUI For UI */
const swaggerUI = require("swagger-ui-express");
/**Load SwaggerJsDoc For Documentation */
const swaggerJsDoc = require("swagger-jsdoc");
/**Load Axios For InterConnecting Microservices */
const axios = require("axios");
/**Storing PORT number In a Variable */
const PORT = 8000;
/**Storing Host For Making More Dynamic */
const HOST = "localhost";
/**Load The Schema Model Meals */
require("./Model/Meals");
const Meals = mongoose.model("Meals");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Meal API",
      version: "1.0.0",
      description: "A Simple Express Meal API",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
  },
  apis: ["app.js"],
};
const specs = swaggerJsDoc(options);
/**Load Method To Perform Crud Operations */
const app = express();
/**Load Method And Define URL For Swagger With Express */
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
/**Call the Method For Logging*/
setupLogging(app);
/**Create a Port From WHich It Can Listen To Request */
app.listen(PORT, () => {
  console.log("Meals Service Server Started........");
});

/**Method For Converting JSON Data Into String */
app.use(bodyParser.json());

/**MongoDB Atlas Connection String */
mongoose.connect(
  "mongodb+srv://Shuaib:Shuaib@railwaydatabase.mainq.mongodb.net/MealsDatabase?retryWrites=true&w=majority",
  () => {
    console.log("Connected to Meals Database!!!");
  }
);
/**
 * @swagger
 * /addMeal:
 *   post:
 *     summary: Create a new book
 *     tags: [Meals]
 *     requestBody:
 *          - MealName
 *          - Category
 *          - Price
 *     responses:
 *       200:
 *         description: The meal was successfully created
 *       500:
 *         description: Some server error
 */
/**RestAPI Request To Add A Meal  */
app.post("/addMeal", (req, res) => {
  var newMeal = {
    MealName: req.body.MealName,
    Category: req.body.Category,
    Price: req.body.Price,
  };
  var MealsService = new Meals(newMeal);
  MealsService.save()
    .then(() => {
      console.log("New Meal Added");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.status(201).json({
    message:
      MealsService.MealName +
      " Added Successfully With MealID-" +
      MealsService.id,
  });
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Meals:
 *       type: object
 *       required:
 *         - MealName
 *         - Category
 *         - Price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         MealName:
 *           type: string
 *           description: Name Of The Meal
 *         Category:
 *           type: string
 *           description: Meal Category
 *         Price:
 *           type:number
 *           description: Price Of the Meal
 *       example:
 *         id: 621357f0f5030e3356d7e116
 *         MealName: IDLY
 *         Category:Veg
 *         Price:100
 */

/**
 * @swagger
 * tags:
 *   name: Meals
 *   description: The Meals Managing API
 */

/**
 * @swagger
 * /getAllMeal:
 *   get:
 *     summary: Returns the list of all the Meals
 *     tags: [Meals]
 *     responses:
 *       200:
 *         description: The list of the Meals
 */
/**RestAPI Request To Get All Meal  */
app.get("/getAllMeal", (req, res) => {
  Meals.find()
    .then((meals) => {
      res.json(meals);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
/**
 * @swagger
 * /getMealByID/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meal id
 *     responses:
 *       200:
 *         description: The meal description by id
 *       404:
 *         description: The meal was not found
 */

/**RestAPI Request To Get Meal by ID */
app.get("/getMealByID/:id", (req, res) => {
  Meals.findById(req.params.id)
    .then((Meals) => res.status(200).json(Meals))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /deleteMeal/{id}:
 *   delete:
 *     summary: Remove the  meal by id
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meal id
 *
 *     responses:
 *       200:
 *         description: The meal was deleted
 *       404:
 *         description: The meal was not found
 */

/**RestAPI Request To Delete Meal*/
app.delete("/deleteMeal/:id", (req, res) => {
  Meals.findByIdAndDelete(req.params.id)
    .then((meals) => {
      if (meals) {
        res.send("Meal Deleted Sucessfully");
      } else {
        res.sendStatus("Error Found");
      }
    })
    .catch((err) => {
      throw err;
    });
});
/**
 * @swagger
 * /updateMeal/{id}:
 *  put:
 *    summary: Update the meal by the id
 *    tags: [Meals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The meal id
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: The meal was updated
 *      404:
 *        description: The meal was not found
 *      500:
 *        description: Some error happened
 */
/**RestAPI Request To Update Meal*/
app.put("/updateMeal/:id", function (req, res) {
  Meals.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Meals.findOne({ _id: req.params.id })
      .then(function (meals) {
        res.send("Meal Updated Successfully!!!");
      })
      .catch((err) => {
        throw err;
      });
  });
});

