// added the req imports
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//sets the port using the env
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware configurations
//parses incoming request with urlencoded, parses it to jsom, handles via routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to MongoDB b4 express
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is now listening on PORT ${PORT}.`);
  });
});
