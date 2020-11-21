// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const isAuthenticated = require('../config/middleware/isAuthenticated');
const db = require('../models');
// const question = require('../models/question');

// Routes
// =============================================================
module.exports = function (app) {

  /**
 * Home Page
 */
  app.get('/', function (req, res) {
    res.render('index', { user: req.user });
  });

  /**
 * Home Page, again
 */
  app.get('/home', function (req, res) {
    res.render('index', { user: req.user });
  });

  /**
 * Signup page
 */
  app.get('/signup', function (req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('signup', { user: req.user });
    }
  });

  /**
 * Login page
 */
  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('login', { user: req.user });
    }
  });

  app.get('/takequiz/:id', isAuthenticated, function (req, res) {
    // api call to db.Quiz passing in id
    db.Question.findAll({
      raw: true,
      where: {
        QuizId: req.params.id
      },
    }).then(function (questions) {
      console.log(questions);
      res.render('takequiz', { user: req.user, questions: questions, QuizId: questions[0].QuizId });
    });
    // pass in after req.user the results from the db call

  });

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/quiz', isAuthenticated, function(req, res) {
    res.render('quiz', { user: req.user, QuizId:req.query.quiz_id });
  });

  // cms route loads cms.html
  app.get('/question', isAuthenticated, function (req, res) {
    res.render('question', { user: req.user });
  });


  app.get('/quizzes', isAuthenticated, function (req, res) {
    res.render('quizzes', { user: req.user });
  });

  app.get('/results', isAuthenticated, function (req, res) {
    db.Score.findAll({
      raw: true,

      where: {
        UserId: req.user.id
      },
      include: [db.Quiz]
    }).then(function (scores) {
      console.log(scores);
      res.render('results', {
        user: req.user, scores: scores.map(score => {
          return {
            progress: (score.results / score.numQuestions) * 100,
            ...score
          };
        })
      });
    });
  });
};
