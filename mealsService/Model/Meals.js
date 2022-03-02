/**Create A Model Called Meals Where We Can Able To Get,Add,Delete,PUT Meals */
/**Load Mongoose */
const mongoose = require("mongoose");

mongoose.model("Meals", {
  MealName: {
    type: String,
    min: [2, "Enter A Valid Meal Name!!!"],
    max: 25,
    unique: true,
    required: [true, "Please Mention the Meal Name..."],
  },
  Category: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: [true, "Please Select the Category..."],
  },
  Price: {
    type: Number,
    required: [true, "Please Mention the Price..."],
  },
});
