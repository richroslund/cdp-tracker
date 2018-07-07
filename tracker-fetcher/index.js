var kue = require('kue');
var queue = kue.createQueue({redis: process.env.REDIS_URL});
const redis = require('redis');
// var db = redis.createClient(process.env.REDIS_URL);


queue.process('fetch-cdps', function(job, done){
  console.log('fetch-cdps job processed');
  done();
});