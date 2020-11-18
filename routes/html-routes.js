// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Routes
// =============================================================
module.exports = function(app) {

  /**
 * Home Page
 */
  app.get('/', function(req, res) {
    res.render('index', { user: req.user });
  });

  /**
 * Home Page, again
 */
  app.get('/home', function(req, res) {
    res.render('index', { user: req.user });
  });

  /**
 * Signup page
 */
  app.get('/signup', function(req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('signup', { user: req.user });
    }
  });

  /**
 * Login page
 */
  app.get('/login', function(req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('login', { user: req.user });
    }
  });

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/quiz', isAuthenticated, function(req, res) {
    res.render('quiz', { user: req.user });
  });

  // cms route loads cms.html
  app.get('/question', isAuthenticated, function(req, res) {
    res.render('question', { user: req.user });
  });


  app.get('/quizzes', isAuthenticated, function(req, res) {
    res.render('quizzes', { user: req.user });
  });

  app.get('/members', isAuthenticated, function(req, res) {
    res.render('members', { user: req.user });
  });

};
