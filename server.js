// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

function createNaturalDate(dateObject) {
  var month = dateObject.getMonth();
  var date = dateObject.getDate();
  var year = dateObject.getFullYear();
  var monthNames = [ "January", "February", "March", "April", "May", "June", "November", "December" ];
  var naturalDate = monthNames[month] + ' ' + date + ', ' + year;
  return naturalDate;
}

app.get("/:time", function (req, res) {
  // grab the param value
  var time = req.params.time;
  console.log(req.params.time);
  // if param val is a unix timestamp or natural language date
  var unixTime;
  var naturalDate;
  // Check if unix time is all integers
  if (time.match(/[0-9]+/)[0].split('').length === time.length) {
    unixTime = time;
    var dateObject = new Date(time * 1000);
    naturalDate = createNaturalDate(dateObject);
  } else if (Date.parse(time)) {
    var dateObject = new Date(time);
    unixTime = Date.parse(time) / 1000;
    naturalDate = createNaturalDate(dateObject);
  } else {
    unixTime = null;
    naturalDate = null;
  }

  var output = {
    "unix": unixTime,
    "natural": naturalDate
  };

   res.send(output);
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
