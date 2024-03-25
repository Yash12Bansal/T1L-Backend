const express = require("express");

const router = express.Router();
const NewPatientRequests = require("../models/New_Patients_Requests");
const NewExerciseRequests = require("../models/New_Exercise_Request.js");
const NewFoodRequests = require("../models/New_Food_Request.js");
const Exercises = require("../models/Exercises.js");
const indexController = require("../controller/index_controller");
const Food = require("../models/Food.js");
const User = require("../models/User.js");

router.use("/auth", require("./auth"));
router.use("/details", require("./details"));
router.use("/exercises", require("./exercises"));
router.use("/exerciseEntry", require("./exercise"));
router.use("/insulinEntry", require("./insulin"));
router.use("/bgEntry", require("./blood_glucose"));
router.use("/food", require("./food"));
router.use("/prediction", require("./prediction"));
router.use("/newExerciseRequest", require("./new_exercise_request"));
router.use("/newFoodRequest", require("./new_food_request"));
var mongodb = require("mongodb");
const Insulin = require("../models/Insulin.js");
const PredictonExtraDetails = require("../models/Prediction_Extra_Details.js");
const FoodEntry = require("../models/Food_Entry.js");
router.get("/getPendingPatients", (req, res) => {
  NewPatientRequests.find({})
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});
router.get("/getPendingFoods", (req, res) => {
  NewFoodRequests.find({})
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});
router.get("/getPendingExercises", (req, res) => {
  NewExerciseRequests.find({})
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/exerciseAccepted", (req, res) => {
  const { name, b } = req.body;
  Exercises.create({
    A: name,
    B: b,
  })
    .then((obj) => {
      console.log(obj);
      res.send({
        code: 1,
      });
    })
    .catch((err) => {
      res.send({
        code: 0,
      });
    });
});

router.delete("/deleteExerciseRequest/:exercise_name", (req, res) => {
  const { exercise_name } = req.params;
  console.log("WWW" + exercise_name);

  console.log("DFKDKJFD" + req.params);
  NewExerciseRequests.deleteOne({ exercise_name: exercise_name })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

// router.use('/expertAuth',require('.
router.post("/foodAccepted", (req, res) => {
  const { name, calories, proteins, carbs, fat, servingSize } = req.body;
  Food.create({
    name: name,
    calories,
    carbs,
    protein: proteins,
    fat,
    serving_size: servingSize,
  })
    .then((obj) => {
      console.log(obj);
      res.send({
        code: 1,
      });
    })
    .catch((err) => {
      res.send({
        code: 0,
      });
    });
});

router.delete("/deleteFoodRequest/:food_name", (req, res) => {
  const { food_name } = req.params;
  console.log("WWW" + food_name);

  console.log("DFKDKJFD" + req.params);
  NewFoodRequests.deleteOne({ food_name: food_name })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

///////////////

router.post("/acceptNewPatientRequest/", (req, res) => {
  const { email } = req.body;

  console.log("DFKDKJFD" + req.params);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      User.updateOne(
        { email: email },
        {
          $set: {
            user_app_usage_eligiblity: true,
          },
        }
      )
        .then((response) => {
          res.send({
            code: 1,
          });
        })
        .catch((error) => {
          res.send({
            code: 0,
          });
        });
    } else {
      res.send({
        code: 1,
      });
    }
  });
});

router.delete("/deleteNewPatientRequest/:email", (req, res) => {
  const { email } = req.params;

  console.log("DFKDKJFD" + req.params);
  NewPatientRequests.deleteOne({ email })
    .then((response) => {
      res.send({
        code: 1,
      });
    })
    .catch((error) => {
      res.send({
        code: 0,
      });
    });
});

router.get("/getFoodDatabase", (req, res) => {
  Food.find({})
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getPatients", (req, res) => {
  User.find({ user_app_usage_eligiblity: true })
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});
router.get("/getInsulin", (req, res) => {
  Insulin.find({})
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getPredictionExtraDetails/:email", (req, res) => {
  const { email } = req.body;
  PredictonExtraDetails.find({ email })
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getInsulinDetails/:id", (req, res) => {
  const { id } = req.params;
  const urlDecodedEmail = decodeURIComponent(id);
  const decodedEmail = atob(urlDecodedEmail);

  // console.log("THIS IS INSULI DETAILS " + x);
  // console.log("THIS IS INSULI DETAILS " + email);
  console.log("THIS IS INSULI DETAILS " + id);

  Insulin.find({ email: decodedEmail })
    .then((model) => {
      console.log("DK" + model[0].insulin_entries_list);
      res.send(model[0].insulin_entries_list);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getFoodDetails/:email", (req, res) => {
  const { email } = req.body;
  FoodEntry.find({ email })
    .then((model) => {
      console.log(model);
      res.send(model);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/changeAppUsagePermission", (req, res) => {
  const { email, value } = req.body;
  User.updateOne(
    { email: email },
    { $set: { user_app_usage_eligiblity: value } }
  )
    .then((obj) => {
      console.log("done");
      res.send({
        code: 1,
        msg: "",
      });

      // res.send({
      //   kq: 1,
      //   msg: "ADD HO GAYO DETAILS",
      // });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});
router.post("/changePredictionPermission", (req, res) => {
  const { email, value } = req.body;
  User.updateOne(
    { email: email },
    { $set: { user_insulin_prediction_allowed: value } }
  )
    .then((obj) => {
      console.log("done");
      res.send({
        code: 1,
        msg: "",
      });

      // res.send({
      //   kq: 1,
      //   msg: "ADD HO GAYO DETAILS",
      // });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});

module.exports = router;
