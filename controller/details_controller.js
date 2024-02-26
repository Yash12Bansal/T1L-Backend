const User = require("../models/User.js");

module.exports.addDetails = function (req, res) {
  var {
    email,
    name,
    gender,
    dob,
    phone,
    doses,
    yearOfDiagnosis,
    weight,
    height,
    doctorName,
  } = req.body;
  console.log("this si calleddddd" + email);
  User.updateOne(
    { email: email },
    {
      $set: {
        name: name,
        sex: gender,
        dob: dob,
        total_doses: doses,
        doctor_name: doctorName,
        year_of_diabetes_diagnosis: yearOfDiagnosis,
        weight: weight,
        height: height,
        phone: phone,
      },
    },
    {
      multi: true,
      upsert: true,
    }
  )
    .then((obj) => {
      res.send({
        kq: 1,
        msg: "ADD HO GAYO DETAILS",
      });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

// function(err, numberAffected){
//     if(err){
//         res.send({
//             kq: 0,
//             msg: "kết nối DB thất bại",
//             });
//             console.error(err);
//     }
//     else{
//         res.send({
//             kq: 1,
//             msg: "ADD HO GAYO DETAILS",
//             });

//     }

// }
