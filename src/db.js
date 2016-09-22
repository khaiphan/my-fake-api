const uuid = require('uuid');
const Chance = require('chance');
const chance = new Chance();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');
const db = low('./data/db.json', {
  storage: fileAsync
});

db.defaults({users: []}).value();
db.defaults({test: []}).value();
db.defaults({houses: []}).value();

const users = db.get('users');
const houses = db.get('houses');

if (!users.find().value()) {
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    users.push({
      id: uuid(),
      active: chance.bool({likelihood: 80}),
      role: chance.weighted(['lead', 'user'], [1, 100]),
      firstname: chance.first(),
      lastname: chance.last(),
      email: chance.email(),
      password: chance.string({length: 12}),
      website: chance.url({path: ''}),
      created: Date.now(),
    }).value();
  }
}

if (!houses.find().value()) {
  // Create 1000 houses
  for (let i = 0; i < 1000; i++) {
    houses.push({
      id: uuid(),
      name: '',
      location: '',
      created: Date.now(),
    }).value();
  }
}

export default db;
