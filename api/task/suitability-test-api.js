const fs = require('fs');
const express = require('express')
const app = express()
const port = 3001

app.get('/suitability', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');

    fs.readFile('./task/suitability-data.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })