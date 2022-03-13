// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use(cors({
  optionsSuccessStatus: 200
}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  const currentDate = Date.now();
  const dateInGMT = new Date(currentDate).toGMTString() ;
  res.json({unix: currentDate, utc: dateInGMT})
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  const regex = new RegExp('[,-\\s]');

  if(regex.test(date)) {
    const formatDate = new Date(date);
    const dateInGMT = new Date(formatDate).toGMTString();
    return dateInGMT === "Invalid Date"
    ? res.json({error: "Invalid Date"})
    : res.json({unix: new Date(date).valueOf(), utc: dateInGMT});
  }
  
  const dateInGMT = new Date(Number(date)).toGMTString();
    return dateInGMT === "Invalid Date"
    ? res.json({error: "Invalid Date"})
    : res.json({unix: Number(date), utc: dateInGMT });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
