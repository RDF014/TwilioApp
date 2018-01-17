const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const Game = require('./game');

const newGame = new Game();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
  const messageBody = req.body;
  const userRes = messageBody.Body.toLowerCase().trim();
  let method;

  if (userRes === 'start') {
    method = 'start';
  } else if (Number(userRes) >= 1) {
    method = 'checkAnswer';
  } else {
    method = 'invalidRes';
  }
  newGame[method](userRes)
  .then(msg => {
    const response = new twilio.twiml.MessagingResponse();
    response.message(msg);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(response.toString());
    res.send();
  })
  .catch(err => console.log(err));
});

app.listen(1337, () => {
  console.log("Express server listening on port 1337");
});
