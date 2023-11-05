const mongoose = require("mongoose");

//?????????????????
mongoose.connect(process.env.MONOGDB_URI || "mongodb://localhost:3001", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
