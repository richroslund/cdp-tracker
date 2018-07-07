var kue = require('kue');
var queue = kue.createQueue({redis: process.env.REDIS_URL});
const redis = require('redis');
const axios = require('axios');
const _ = require('lodash');
const {promisify} = require('util');

var db = redis.createClient(process.env.REDIS_URL);

const setAsync = promisify(db.set).bind(db);
queue.process('fetch-cdps', function(job, done){
  console.log('fetch-cdps job processed');
  axios.get(process.env.MAKER_URL)
  .then(function (apiResponse) {
    var response = apiResponse.data;
    // handle success
    console.log(response.total, response.lastBlockNumber);
    db.set("cdp_total",response.total, redis.print);
    db.set("cdp_lastBlockNumber",response.lastBlockNumber, redis.print);
    _.forEach(response.results, (cdp) => {
      console.log(cdp.cupi);
      db.hset("cdp",cdp.cupi, JSON.stringify(cdp), redis.print);
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    done();
  });
});