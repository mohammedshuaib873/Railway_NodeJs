/**Create A Model Called Meals Where We Can Able To Get,Add,Delete,PUT Meals */
/**Load Mongoose */
const mongoose = require("mongoose");

mongoose.model("orderMeals", {
  passengerID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  mealID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  passengerName: {
    type: String,
    min: [2, "Enter A Valid Name!!!"],
    max: 25,
    required: [true, "Please Mention the  Name..."],
  },
  category: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: [true, "Please Select the Category..."],
  },
  slot: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: [true, "Please Mention the Slot"],
  },
  quantity: {
    type: String,
    required: [true, "Please Enter the Quantity"],
  },
  seatNo: {
    type: String,
    required: [true, "Please Enter the Seat Number"],
  },
  amount: {
    type: Number,
    required: [true, "Please Mention the Amount..."],
  },
});
