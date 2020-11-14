module.exports = function(sequelize, DataTypes) {
  var Quiz = sequelize.define('Quiz', {
    // Giving the Quiz model a name of type STRING
    name: DataTypes.STRING
  });

  Quiz.associate = function(models) {
    // Associating Quiz with Questions
    // When an Quiz is deleted, also delete any associated Questions
    Quiz.hasMany(models.Question, {
      onDelete: 'cascade'
    });
  };

  return Quiz;
};
