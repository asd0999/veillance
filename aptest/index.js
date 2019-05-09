var express = require('express');
var app = express();
app.use(express.static('.'));

// var bodyParser = require("body-parser");
//app.use(bodyParser.json());

var {
  Client
} = require('pg');
var client;

client = new Client({
  database: 'inclass3'
});

client.connect();

var inputFile = 'aptest-02.csv';

const PORT = process.env.PORT || 8000;

var fs = require('fs');
var parse = require('csv-parse');

var counter = 0;

var csvData = [];
fs.createReadStream('aptest-02.csv')
  .pipe(parse({
    delimiter: ';'
  }))
  .on('data', function(csvrow) {
    console.log(csvrow);
    //do something with csvrow
    if (counter > 4) {
      csvData.push(csvrow);
    }
    counter++;
  })
  .on('end', function() {
    //do something wiht csvData
    console.log('new csv');
    console.log(csvData);
    csvData.forEach(element => {
      // console.log(typeof(element[0]));
      console.log(element[0]);
      let arr = element[0].split(',');
      // console.log(arr[0]);
      client.query('INSERT INTO devices (station, ap) VALUES ($1, $2)', [arr[0], arr[5]], function(error, results) {});

    });
  });

app.listen(PORT, function() {
  console.log('Server up! Listening on port: ' + PORT);
});