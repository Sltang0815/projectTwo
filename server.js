// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
const morgan = require("morgan");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/quiz-api-routes.js")(app);
require("./routes/question-api-routes.js")(app);
let config = { force: true };
if (process.env.NODE_ENV === "test") {
  config.force = true;
}
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync(config).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
