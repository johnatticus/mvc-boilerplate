const User = require('./User')
const Gym = require('./Gym')
const Friend = require('./Friend')

// User will have a gym_id foreign key
Gym.hasMany(User, {
  foreignKey: 'gym_id',
  onDelete: 'CASCADE'
})

// User.belongsTo(Gym, {
//   foreignKey: 'gym_id',
//   onDelete: 'CASCADE'
// })

// Friend will have a user_id foreign key
User.hasMany(Friend, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// Friend.belongsTo(Gym, {
//   foreignKey: 'gym_id',
//   onDelete: 'CASCADE'
// })

module.exports = { User, Friend, Gym }
