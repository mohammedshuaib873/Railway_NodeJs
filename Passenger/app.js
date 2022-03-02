/**Load Express To Handle and Listen To Request*/
const express = require("express");
/**Load mongoose to Connect Nodejs And MongoDb Atlas */
const mongoose = require("mongoose");
/**Load Body-Parser To Convert Json Data Into String In Postman*/
const bodyParser = require("body-parser");
/**Load Logging To Capture Events*/
const { setupLogging } = require("./Logging/logging");
/**Load The Schema Model Meals */
require("./Model/Passenger");
const Passenger = mongoose.model("Passenger");
/**Load Method To Perform Crud Operations */
const app = express();
/**Call the Method For Logging*/
setupLogging(app);
/**Create a Port From Which It Can Listen To Request */
app.listen(7002, () => {
  console.log("Passenger Server Running...");
});
/**Method For Converting JSON Data Into String */
app.use(bodyParser.json());
/**MongoDB Atlas Connection String */
mongoose.connect(
  "mongodb+srv://Shuaib:Shuaib@railwaydatabase.mainq.mongodb.net/CustomerDatabase?retryWrites=true&w=majority",
  () => {
    console.log("Connected to Passenger Database...");
  }
);
/**RestAPI Request To Add A Passenger  */
app.post("/addPassenger", (req, res) => {
  var newPassenger = {
    name: req.body.name,
    emailID: req.body.emailID,
    trainNo: req.body.trainNo,
  };
  var passenger = new Passenger(newPassenger);
  passenger
    .save()
    .then(() => {
      console.log("New Passenger Registered");
      res.status(201).json({
        message: "Passenger Login Sucessfully With PassengerID-" + passenger.id,
      });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
/**RestAPI Request To Get All Passengers  */
app.get("/passengers", (req, res) => {
  Passenger.find()
    .then((passenger) => {
      res.json(passenger);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

/**RestAPI Request To Get Passenger by ID */
app.get("/passenger/:id", (req, res) => {
  Passenger.findById(req.params.id)
    .then((Passenger) => res.status(200).json(Passenger))
    .catch((err) => res.status(500).json("Error: " + err));
});
/**RestAPI Request To Delete A Passenger*/
app.delete("/passenger/:id", (req, res) => {
  Passenger.findOneAndRemove(req.params.id)
    .then((passenger) => {
      if (passenger) {
        res.send("Passenger Deleted Sucessfully");
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      throw err;
    });
});
