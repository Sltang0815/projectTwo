const { INTEGER } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let Quiz = sequelize.define('Quiz', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    difficulty: {
      type: INTEGER,

    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
    // Giving the Quiz model a name of type STRING
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
