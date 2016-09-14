
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const uuid = require('uuid');
const Chance = require('chance');
const chance = new Chance();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');
const db = low('./data/db.json', {
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

app.use(express.static(`${__dirname}/../apidoc`));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.set('port', (process.env.PORT || 4000));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../apidoc/index.html`));
});

/**
 * @apiDefine UserSucess
 * @apiSuccess {Bool} active State of the User.
 * @apiSuccess {String} role Role of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname Lastname of the User.
 * @apiSuccess {String} website Website of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} password Password of the User. You can use it login and receive an access_token
 * @apiSuccess {Date} created The day that user have been created.
 */

/**
 * @api {get} /user/ Request a list of user
 * @apiName GetListUser
 * @apiGroup User
 *
 * @apiExample Example usage:
 * curl -i https://my-fake-api.herokuapp.com/users?active=false&sort=email&limit=100
 * @apiParam {Bool} active User state, true/false
 * @apiParam {String} sort Sort user list by... Default: email
 * @apiParam {Number} limit Limit the user list Default: 100
 * @apiParam {String} filter The rest params will be used to filter the result: For example: active=true&id=1
 *
 * @apiUse UserSucess
 */

app.get('/users', (req, res) => {
  const {
    sort = 'email',
    limit = 100,
    ...args
  } = req.query;
  Object.keys(args).map((value, index) => {
    const arg = args[value].toLowerCase();
    if(arg === 'true' || arg === 'false') {
      args[value] = JSON.parse(arg);
    };
  });

  // const filterObj = {};
  // filterObj[filter] = filter.charAt(0) === '-' ? false : true;
  const data = users
  .filter(args)
  .sortBy(sort)
  .take(limit)
  .value();
  res.json(data);
});


/**
 * @api {get} /user/:id Request specific user
 * @apiName GetSpecificUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID. If you leave it blank it will return a list of users (limit: 100)
 *
 * @apiUse UserSucess
 */


app.get('/users/:id', (req, res) => {
  const data = users.find({id: req.params.id}).value();
  res.json(data);
});

app.post('/users', (req, res) => {
  const data = users.find({
    email: req.body.email
  })
  .value();
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

module.exports = app;
