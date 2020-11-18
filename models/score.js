// eslint-disable-next-line no-unused-vars
module.exports = function (sequelize, DataTypes) {
  // eslint-disable-next-line no-unused-vars
  let Score = sequelize.define('Score', {
    results: {
      type: DataTypes.INTEGER,
      allowNull: false,


    },
    numQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  Score.associate = function (models) {
    Score.belongsTo(models.User, {
      onDelete: 'cascade'
    });

    Score.belongsTo(models.Quiz, {
      onDelete: 'cascade'
    });

  };
  return Score;
};