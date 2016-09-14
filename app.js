const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const uuid = require('uuid');
const Chance = require('chance');
const chance = new Chance();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');
const db = low('./db.json', {
  storage: fileAsync
});

db.defaults({users: []}).value();

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

const generateToken = (user) => {
  const secret = '8b73a040c467a066351da446d0fc338fc6fba24b';
  const token = jwt.sign(user, secret, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  return token;
};

app.use(cors());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 4000));

app.get('/', (req, res) => {
  res.send('Holla !');
});

app.get('/users', (req, res) => {
  const data = users.value();
  res.json(data);
});

app.get('/users/:id', (req, res) => {
  const data = users.find({id: req.params.id}).value();
  res.json(data);
});

app.post('/users', (req, res) => {
  const data = users.find({
    email: req.body.email
  }).value();
  if (data) {
    const returnData = Object.assign({}, data);
    delete returnData.password;
    if (data.password.toString() === req.body.password.toString()) {
      res.json({
        user: returnData,
        token: generateToken(returnData),
      });
    }
  } else {
    res.status(401).send({
      message: 'Something wrong'
    });
  }
});


app.listen(app.get('port'), () => {
  console.log('Example app listening on port 4000!');
});
