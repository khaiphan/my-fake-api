import db from '../db';

const test = db.get('test');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

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
  const data = test
  .filter(args)
  .sortBy(sort)
  .take(limit)
  .value();
  res.json(data);
});


router.get('/:id', (req, res, next) => {
  const data = test.find({id: req.params.id}).value();
  if(data) {
    res.json(data);
  } else {
    next();
  }
});

router.post('/', (req, res) => {
  const id = uuid();
  test.push({
    id,
    ...req.body
  })
  .value();
  res.status(200).send(test.find({id}).value());
});

router.get('/currencies', (req, res) => {
  const currencies = [{
    name: 'USD',
    symbol: '$',
    base: true,
    rate: 1,
    displayOption: {
      decimal: '.',
      thousand: ',',
      precision: 2,
      format: {
        pos: '%s %v',
        neg: '%s (%v)',
        zero: '%s  --'
      }
    }
  }, {
    name: 'EUR',
    symbol: '€',
    base: false,
    rate: 0.745101,
    displayOption: {
      decimal: '.',
      thousand: ',',
      precision: 2,
      format: {
        pos: '%s %v',
        neg: '%s (%v)',
        zero: '%s  --'
      }
    }
  }, {
    name: 'HKD',
    symbol: '$',
    base: false,
    rate: 7.781919,
    displayOption: {
      decimal: '.',
      thousand: ',',
      precision: 2,
      format: {
        pos: '%s %v',
        neg: '%s (%v)',
        zero: '%s  --'
      }
    }
  }, {
    name: 'GBP',
    symbol: '£',
    base: false,
    rate: 0.647710,
    displayOption: {
      decimal: '.',
      thousand: ',',
      precision: 2,
      format: {
        pos: '%s %v',
        neg: '%s (%v)',
        zero: '%s  --'
      }
    }
  }];
  res.status(200).send(currencies);
});

router.get('/error', (req, res) => {
  res.status(400).send('Error');
});

router.post('/error', (req, res) => {
  res.status(400).send('Error');
});

router.get('/clear', (req, res) => {
  const data = test
  .remove()
  .value();
  res.status(200).send('Done');
});

module.exports = router;
