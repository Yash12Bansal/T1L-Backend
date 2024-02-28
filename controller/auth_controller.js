const User = require("../models/User.js");
const NewPatientRequest=require("../models/New_Patients_Requests.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
        "550164351391-335ovnajfvmmce9u2eesnrrpjpocsgqc.apps.googleusercontent.com"
);

module.exports.authenticate=function(req,res){
      console.log("evaluating post");
      console.log(req.body);
      const { idToken } = req.body;
      verify(req.body, res).catch(console.error);
      async function verify(data, res) {
        const { idToken: token } = data;
        const { email: id } = data;
        const ticket = await client.verifyIdToken({
        idToken: token,
          // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        console.log(payload);
        const userid = payload["sub"];
        console.log(userid);
        User.findOne({ email: id }).then((existingUser) => {
        if (!existingUser) {
            NewPatientRequest.create({
              email:id
            })
            .then(() => {
              res.send({
              kq: 1,
              msg: "Nahi tha re User IN THE DATABASE",
              });
            })
            .catch((err) => {
              res.send({
                kq: 0,
                msg: "kết nối DB thất bại",
              });
              console.error(err);
            });
           
            User.create({ email: id, ss: { name: "Raghav" } })
            .then(() => {
                res.send({
                kq: 1,
                msg: "Nahi tha re User IN THE DATABASE",
                });
              })
              .catch((err) => {
                res.send({
                  kq: 0,
                  msg: "kết nối DB thất bại",
                });
                console.error(err);
              });
            // new User({ googleId: userid }).save();
          } else {
            res.send({
              kq: 1,
              msg: "Phele se hi tha re User in the database",
            });
          }
        });
      }
}