const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis');
const app = express();
const _ = require('lodash');

var kue = require('kue')
var queue = kue.createQueue({redis: process.env.REDIS_URL});
var db = redis.createClient(process.env.REDIS_URL);


app.get('/', (req, res) => {
  return res.json({ version: "0.0.1" });
});
app.get('/cdp', (req, res) => {
  db.hgetall("cdp", function (err, obj) {
    return res.json(_.map(obj, (cdp) => JSON.parse(cdp)));
  });
});


app.post('/cdp/refresh', (req, res) => {
  var job = queue.create('fetch-cdps').save( function(err){
    if( err )
      return res.json({error: err});
    return res.json({id: job.id})
  });
});

app.get('/cdp/:cdpid', (req, res) => {
  console.dir(req.params.cdpid);
  db.hget("cdp", req.params.cdpid, function (err, obj) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(JSON.parse(obj));
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})