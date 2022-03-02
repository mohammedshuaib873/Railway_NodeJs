const mongoose = require("mongoose");
const { isEmail } = require("validator");

mongoose.model("Passenger", {
  name: {
    type: String,
    require: true,
  },
  emailID: {
    type: String,
    require: true,
  },
  trainNo: {
    type: String,
    require: true,
  },
});
