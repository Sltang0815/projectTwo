// eslint-disable-next-line no-unused-vars
module.exports = function(sequelize, DataTypes){
  // eslint-disable-next-line no-unused-vars
  let score = sequelize.define('Score', {
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

};