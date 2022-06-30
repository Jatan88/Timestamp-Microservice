var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let date;
  if(!dateString){
    date = new Date();
  }else{
    if(!isNaN(dateString)){
      date = new Date(parseInt(dateString));
    }else{
      date = new Date(dateString);
    }
  }
  if(date.toString() === 'Invalid Date') {
    res.json({error: date.toString()});
  }else{
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
