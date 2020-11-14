module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Question.associate = function(models) {
    // We're saying that a Question should belong to an Quiz
    // A Question can't be created without an Quiz due to the foreign key constraint
    Question.belongsTo(models.Quiz, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Question;
};
