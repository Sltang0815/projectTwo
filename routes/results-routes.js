// Requiring our models
var db = require('../models');

module.exports = function(app) {
  app.get('/api/results', function(req, res) {
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
};