const db = require('./db');

const token = db.sequelize.define('token', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  token: {
    type: db.Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  }
},{
  timestamps: false,
  freezeTableName: true
});

token.belongsTo(db.user);

db.sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));

module.exports = {
  token
}