module.exports = function (sequelize, DataTypes) {
  var Quiz = sequelize.define('Quiz', {
    // Giving the Quiz model a name of type STRING
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Quiz.associate = function (models) {
    // Associating Quiz with Questions
    // When an Quiz is deleted, also delete any associated Questions
    Quiz.hasMany(models.Question, {
      onDelete: 'cascade'
    });
    Quiz.hasMany(models.Score, {
      onDelete: 'cascade'
    });
  };

  return Quiz;
};
