// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
const morgan = require('morgan');
const session = require('express-session');
// Requiring passport as we've configured it
const passport = require('./config/passport');
const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require('./models');


// Set up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// Static directory
app.use(express.static('public'));
// Sets up Passport
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require('./routes/html-routes.js')(app);
require('./routes/quiz-api-routes.js')(app);
require('./routes/question-api-routes.js')(app);
require('./routes/user-routes.js')(app);
let config = { force: false };
if (process.env.NODE_ENV === 'test') {
  config.force = true;
}
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync(config).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});
