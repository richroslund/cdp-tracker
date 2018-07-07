var kue = require('kue');
var queue = kue.createQueue({redis: process.env.REDIS_URL});
const redis = require('redis');
const axios = require('axios');
const _ = require('lodash');
const {promisify} = require('util');

var db = redis.createClient(process.env.REDIS_URL);
console.log('fetchin from ',process.env.CDP_API_URL, process.env.ETH_PRICE_API_URL);
const setAsync = promisify(db.set).bind(db);
queue.process('fetch-cdps', function(job, done){
  axios.get(process.env.CDP_API_URL)
  .then(function (apiResponse) {
    var response = apiResponse.data;
    db.del("cdp",redis.print);
    _.forEach(response, (cdp) => {
      db.hset("cdp",cdp.cupi, JSON.stringify(cdp), () => {});
    });
    console.log("done fetching cdps");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    done();
  });
});


queue.process('fetch-eth-price', function(job, done){
  axios.get(process.env.ETH_PRICE_API_URL)
  .then(function (apiResponse) {
    var response = apiResponse.data;
    var ethPrice = _.last(response);
    db.set("eth:price", JSON.stringify(ethPrice), redis.print);
    console.log("done fetching eth");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    done();
  });
});