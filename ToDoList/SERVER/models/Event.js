var mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: Number,
  label: String,
  status: Boolean,
  position: Number,
});

module.exports = mongoose.model("ToDo", schema);
