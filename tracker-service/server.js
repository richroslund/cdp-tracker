const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis');
const app = express();

app.get('/', (req, res) => {
  return res.json({ version: "0.0.1" });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})