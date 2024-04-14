var mongoose = require("mongoose");
const app = express();
// mongodb://localhost/T1LifeDB
// "mongodb+srv://samwilson14111:e53tJB2McTvAzlst@t1lcluster.rn9wgur.mongodb.net/?retryWrites=true&w=majority&appName=T1LCluster"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://samwilson14111:e53tJB2McTvAzlst@t1lcluster.rn9wgur.mongodb.net/test?retryWrites=true&w=majority&appName=T1LCluster"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// mongoose.connect(
//   "mongodb+srv://samwilson14111:e53tJB2McTvAzlst@t1lcluster.rn9wgur.mongodb.net/test?retryWrites=true&w=majority&appName=T1LCluster"
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "error dbs"));
// db.once("open", function () {
//   console.log("Success connection the database mongo");
// });
connectDB().then(() => {
  app.listen(8080, () => {
    console.log("listening for requests. ye rahi request sss ss ");
  });
});
module.exports = db;
