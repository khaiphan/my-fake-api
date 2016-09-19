import db from '../db';

const jwt = require('jsonwebtoken');
const users = db.get('users');
const express = require('express');
const router = express.Router();

const generateToken = (user) => {
  const secret = '8b73a040c467a066351da446d0fc338fc6fba24b';
  const token = jwt.sign(user, secret, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  return token;
};

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
 * @api {get} /api/user/ Request a list of user
 * @apiName GetListUser
 * @apiGroup User
 *
 * @apiExample Example usage:
 * curl -i https://my-fake-api.herokurouter.com/?active=false&sort=email&limit=100
 * @apiParam {Bool} active User state, true/false
 * @apiParam {String} sort Sort user list by... Default: email
 * @apiParam {Number} limit Limit the user list Default: 100
 * @apiParam {String} filter The rest params will be used to filter the result: For example: active=true&id=1
 *
 * @apiUse UserSucess
 */

router.get('/', (req, res) => {
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
 * @api {get} /api/user/:id Request specific user
 * @apiName GetSpecificUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID. If you leave it blank it will return a list of users (limit: 100)
 *
 * @apiUse UserSucess
 */


router.get('/:id', (req, res) => {
  const data = users.find({id: req.params.id}).value();
  res.json(data);
});

router.post('/', (req, res) => {
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

module.exports = router;
