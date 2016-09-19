const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('./db');

app.use(express.static(`${__dirname}/../apidoc`));
app.set('appPath', `${__dirname}/../apidoc`);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.set('port', (process.env.PORT || 4000));

require('./routes').default(app);

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 4000!');
});

module.exports = app;
