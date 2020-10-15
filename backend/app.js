const express = require('express');
//const jwt = require('jsonwebtoken'); //jwt
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//user routes
// require('./app/routes/role.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/calendar.routes')(app);

app.listen(8090, () => {
    console.log('App is listening on 8090 port');
});
