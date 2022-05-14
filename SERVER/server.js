const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const uri =
  "mongodb+srv://Pretteter:qQoSiZGnUSqThw6F@cluster0.mqyzw.mongodb.net/ToDO?retryWrites=true&w=majority";

// Connect to MongoDB database
mongoose.connect(uri).then(() => {
  var cors = require("cors");
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/api", routes);

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function () {
    db.db.stats(function (err, stats) {
      console.log(db.collections.todos.stats());
    });
  });

  const Port = process.env.PORT || 3000;
  app.listen(Port, () => {
    console.warn(`App listening on http://localhost:${Port}`);
  });
});
