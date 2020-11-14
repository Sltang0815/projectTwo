var db = require('../models');

module.exports = function(app) {
  app.get('/api/quizs', function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    db.Quiz.findAll({
      include: [db.Question]
    }).then(function(dbQuiz) {
      res.json(dbQuiz);
    });
  });

  app.get('/api/quizs/:id', function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    db.Quiz.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Question]
    }).then(function(dbQuiz) {
      res.json(dbQuiz);
    });
  });

  app.post('/api/quizs', function(req, res) {
    db.Quiz.create(req.body).then(function(dbQuiz) {
      res.json(dbQuiz);
    });
  });

  app.delete('/api/quizs/:id', function(req, res) {
    db.Quiz.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuiz) {
      res.json(dbQuiz);
    });
  });

};
