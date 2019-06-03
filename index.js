require('./datasource/dbconnection');
const log4js = require("log4js");
const dateformat = require("dateformat");
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const port = 3000;
const personalDetailsController = require('./controllers/personalDetailsController');

//log4js config
log4js.configure({
    appenders: {
      everything: {
        type: 'multiFile', base: './logs/', property: 'log', extension: '.log',
        maxLogSize: 10485760, backups: 3, compress: true
      }
    },
    categories: {
      default: { appenders: [ 'everything' ], level: 'debug'}
    }
 });

const logger = log4js.getLogger('log');
logger.addContext('log', 'dash' + dateformat(new Date(), "yyyymmdd"));
// end log4js config

//express
var app = express();
app.listen(port, () => {
    logger.info('Server started at port ' + port);
});

app.use('/personal-details', personalDetailsController);
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');