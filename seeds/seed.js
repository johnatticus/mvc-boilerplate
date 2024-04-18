const sequelize = require('../config/connection')
const { User, Gym } = require('../models/index')
// const { User, Gym, Friend } = require('../models/index')

const userData = require('./userData.json')
const gymData = require('./gymData.json')
// const friendData = require('./friendData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const gyms = await Gym.bulkCreate(gymData, {
    individualHooks: true,
    returning: true
  })

  console.log('\n----- GYMS SEEDED -----\n')

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const user of userData) {
    await User.create({
      ...user,
      gym_id: gyms[Math.floor(Math.random() * gyms.length)].id
    })
  }

  console.log('\n----- USERS SEEDED -----\n')

  // for (const friend of friendData) {
  //   await Friend.create({
  //     ...friend
  //   })
  // }

  // console.log('\n----- FRIENDS SEEDED -----\n')

  process.exit(0)
}

seedDatabase()
