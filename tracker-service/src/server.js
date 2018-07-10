const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis');
const app = express();
const _ = require('lodash');
var cors = require('cors')

var kue = require('kue')
var queue = kue.createQueue({redis: process.env.REDIS_URL});
var db = redis.createClient(process.env.REDIS_URL);
app.use(cors())

var liquidationRate = ( 2 / 3 );
var pethToEth = 1.013;

var getLiquidation = (debt, collateral) => ((debt / liquidationRate) / collateral) / pethToEth;

var queueJob = (jobId) => {
  var job = queue.create(jobId).save( function(err){
    if( err )
      return err;
    return job;
  });
}
var getEthPrice = () => {
  db.get("eth:price", function (err, obj) {
    if (err) {
      console.log(err);
      return err;
    }
    return JSON.parse(obj);
  });
}

app.get('/', (req, res) => {
  return res.json({ version: "0.0.1" });
});
app.get('/cdp', (req, res) => {
  queueJob('fetch-cdps');
  let ethPrice = getEthPrice();
  db.hgetall("cdp", function (err, obj) {
    let cdps = _.map(obj, (cdpStr) => {
      var cdp = JSON.parse(cdpStr);
      cdp.liquidation = getLiquidation(cdp.art, cdp.ink);
      cdp.liquidationCloseness = cdp.liquidation / ethPrice;
      return cdp;
    })
    return res.json(cdps);
  });
});


app.post('/data/refresh', (req, res) => {
  let cdpJob = queueJob('fetch-cdps');
  let ethJob = queueJob('fetch-eth-price');
  return res.json([cdpJob, ethJob]);
});

app.get('/cdp/:cdpid', (req, res) => {
  db.hget("cdp", req.params.cdpid, function (err, obj) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(JSON.parse(obj));
  });
});

app.get('/price/eth', (req, res) => {
  db.get("eth:price", function (err, obj) {
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