// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the questions
  app.get('/api/questions', function(req, res) {
    var query = {};
    if (req.query.quiz_id) {
      query.QuizId = req.query.quiz_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Quiz
    db.Question.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  app.get('/api/questions/quiz/:QuizId', function(req, res) {
    db.Question.findAll({
      where: {
        QuizId: req.params.QuizId
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get('/api/questions/answers/:QuizId', function(req, res) {
    db.Question.findAll({
      where: {
        QuizId: req.params.QuizId
      },
      attributes: ['correctAnswer', 'id']
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single question
  app.get('/api/questions/:id', function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Quiz
    db.Question.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Quiz]
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // POST route for saving a new question
  app.post('/api/questions', function(req, res) {
    db.Question.create(req.body).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // DELETE route for deleting questions
  app.delete('/api/questions/:id', function(req, res) {
    db.Question.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // PUT route for updating questions
  app.put('/api/questions', function(req, res) {
    db.Question.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });
};
