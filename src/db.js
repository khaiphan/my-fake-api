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

const users = db.get('users');

if (!users.find().value()) {
  users.push({
    id: uuid(),
    active: true,
    role: 'admin',
    firstname: 'Khai',
    lastname: 'Phan',
    email: 'khai@8bit.com',
    password: 123456,
    website: 'http://8bitrockr.com/',
    created: Date.now()
  }).value();
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

export default db;
