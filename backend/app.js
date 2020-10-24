const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JwtRequestFilter = require('./app/interceptors/jwtRequestFilter');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/*' , (req,res ,next) => {
    new JwtRequestFilter(req, res, next);
});

require('./app/routes/user.routes')(app);
require('./app/routes/calendar.routes')(app);

app.listen(8090, () => {
    console.log('App is listening on 8090 port');
});
