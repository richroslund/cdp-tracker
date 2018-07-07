var kue = require('kue');
var queue = kue.createQueue({redis: process.env.REDIS_URL});
const redis = require('redis');
const axios = require('axios');
const _ = require('lodash');
const {promisify} = require('util');

var db = redis.createClient(process.env.REDIS_URL);
console.log('fetchin from '+process.env.MAKER_URL);
const setAsync = promisify(db.set).bind(db);
queue.process('fetch-cdps', function(job, done){
  axios.get(process.env.MAKER_URL)
  .then(function (apiResponse) {
    var response = apiResponse.data;
    
    _.forEach(response, (cdp) => {
      db.hset("cdp",cdp.cupi, JSON.stringify(cdp), redis.print);
    });
    console.log('done importing '+_.size(response)+ " cdps");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    done();
  });
});