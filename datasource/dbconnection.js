const log4js = require("log4js");
const dateformat = require("dateformat");
const mongoose = require("mongoose");

//log4js config
log4js.configure({
    appenders: {
      everything: {
        type: 'multiFile', base: '../logs/', property: 'log', extension: '.log',
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

//mongodb connetion
mongoose.connect('mongodb://localhost:27017/dashlead', { useNewUrlParser: true}, err => {
    if (err) {
        logger.error(err);
    } else {
        logger.info('Connected to dashlead');
    }
});

mongoose.connect('mongodb://localhost:27017/country', { useNewUrlParser: true}, err => {
    if (err) {
        logger.error(err);
    } else {
        logger.info('Connected to country');
    }
});
// end mongodb connection

require('../model/country');