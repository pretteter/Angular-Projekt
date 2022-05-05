// var express = require("express");
// var bodyParser = require("body-parser");
// var cors = require("cors");
// var mongoose = require("mongoose");
// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://Pretteter:qQoSiZGnUSqThw6F@cluster0.mqyzw.mongodb.net/ToDO?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   serverApi: ServerApiVersion.v1,
// // });

// mongoose
//   .connect(uri)
//   .then(() => console.log("MongoDB connected..."))
//   .catch((err) => console.log(err));

// // client.connect((err) => {
// //   // const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   if (err) {
// //     console.log("connection error");
// //     console.log(err);
// //   } else {
// //     console.log("database connected");
// //     console.log(client);
// //   }
// //   client.close();
// // });

// var Event = require("./models/Event.js");

// app.use(cors());

// app.get("/todos", async (req, res) => {
//   var events = await Event.find({});
//   res.send(events);
//   console.log("get sucessfull");
// });

// app.post("/todos", (req, res) => {
//   var eventData = req.body;
//   var event = new Event(eventData);

//   event.save((err, result) => {
//     if (err) {
//       console.log("error saving event.");
//       console.log(err);
//     } else {
//       console.log("post sucessfull");
//     }

//     res.sendStatus(200);
//   });
// });

// app.delete("/todos/deleteOne/:id", (req, res) => {
//   // var eventData = req.body;
//   // var event = new Event(eventData);

//   event.save((err, result) => {
//     if (err) {
//       console.log("error saving event.");
//     } else {
//       console.log("delete sucessfull");
//       console.log(res)
//     }
//     // res.sendStatus(200);
//   });
// });

// app.put("/todos", (req, res) => {
//   var eventData = req.body;
//   var event = new Event(eventData);

//   event.save((err, result) => {
//     if (err) {
//       console.log("error saving event.");
//     }
//     res.sendStatus(200);
//   });
// });

// app.listen(3000);
// console.log("MyProject Server is Listening on port 3000");

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// app.use(cors(options));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
//   });

const uri =
  "mongodb+srv://Pretteter:qQoSiZGnUSqThw6F@cluster0.mqyzw.mongodb.net/ToDO?retryWrites=true&w=majority";

// Connect to MongoDB database
mongoose.connect(uri).then(() => {
  var cors = require("cors");
  // const options = {
  //   origin: allowedOrigins,
  // };
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/api", routes);

  app.listen(3000, () => {
    console.log("Server has started!");
  });
});
