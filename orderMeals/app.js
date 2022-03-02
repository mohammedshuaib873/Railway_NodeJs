/**Load Express To Handle and Listen To Request*/
const express = require('express');
/**Load mongoose to Connect Nodejs And MongoDb Atlas */
const mongoose = require('mongoose');
/**Load Body-Parser To Convert Json Data Into String In Postman*/
const bodyParser = require('body-parser');
/**Load Axios To Get Communicate With Other MicroServices */
const axios = require('axios');
/**Load Logging To Capture Events*/
const {setupLogging} = require("./Logging/logging");
/**Load The Schema Model Meals */
require('./Model/orderMeals.js');
const orderMeals = mongoose.model("orderMeals");
/**Load Method To Perform Crud Operations */
const app = express();
/**Call the Method For Logging*/
setupLogging(app);
/**Create a Port From Which It Can Listen To Request */
app.listen(7001,() => {
   console.log("Meals Order Service Server Started........");
});

/**Method For Converting JSON Data Into String */
app.use(bodyParser.json());

/**MongoDB Atlas Connection String */
mongoose.connect("mongodb+srv://Shuaib:Shuaib@railwaydatabase.mainq.mongodb.net/OrderMealsDatabase?retryWrites=true&w=majority", () => {
    console.log("Connected to Order Meals Database!!!");
});

/**RestAPI Request To Order A Meal  */
app.post('/orderMeal', (req, res) => {
    var neworderMeal = {
        passengerID:mongoose.Types.ObjectId( req.body.passengerID),
        mealID: mongoose.Types.ObjectId( req.body.mealID),
        passengerName: req.body.passengerName,
        category: req.body.category,
        slot: req.body.slot,
        quantity: req.body.quantity,
        seatNo: req.body.seatNo,
        amount: req.body.amount,
    }
    var OrderService = new orderMeals(neworderMeal);
    OrderService.save().then(() => {
        console.log("Order For Meal Placed");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
    res.status(201).json({
       message:  "Order Placed Successfully With OrderID-" + OrderService.id     
    });
});

/**RestAPI Request To Get All Orders  */
app.get('/getAllOrders', (req, res) => {
    orderMeals.find().then((ordermeals) => {
        res.json(ordermeals);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

/**RestAPI Request To Get Order by ID */
app.get("/order/:id", (req, res) => {
    orderMeals.findById(req.params.id).then((orderMeals) => {
        /**We Are InterConnecting With Other MicroServices To Get The Data For PassengerName,MealName & Category */
        if (orderMeals) {
            axios.get("http://localhost:7002/passenger/" + orderMeals.passengerID).then((response)=>
            {
                var orderObject = {PassengerName: response.data.name,MealName:"",Category:""}
                axios.get("http://localhost:8000/getMealByID/" + orderMeals.mealID).then((response)=>{
                orderObject.MealName=response.data.MealName;
                orderObject.Category=response.data.Category;
                res.json(orderObject);
                console.log(orderObject);
                })
            })
        }
        else {
           res.send("Invalid ID");
        }
    }).catch((err) => {
        throw err;
    })
})


/**RestAPI Request To Cancel A Order Of A Meal*/
app.delete("/cancelOrder/:id", (req, res) => {
    orderMeals.findByIdAndDelete(req.params.id).then((orderMeals) => {
        if (orderMeals) {
            res.send("Order Cancelled.....");
        }
        else {
            res.sendStatus("Error Found");
        }
    }).catch((err) => {
        throw err;
    });
});

/**RestAPI Request To Update Meal*/
// app.put('/updateMeal/:id',function(req,res){
//     orderMeals.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         orderMeals.findOne({_id:req.params.id}).then(function(orderMeals){
//             res.send("Meal Updated Successfully!!!");
//         }).catch((err) => {
//             throw err;
//         });
//     });
// });


