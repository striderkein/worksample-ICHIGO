// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path')
// const fetch = require('node-fetch');

app.use(express.json());
app.use(morgan());

app.post('/submit', async (req, res) => {
  // TODO: implement your API here
  // const { username, address, wish } = req.body;
  // const url = 'some.url.to.your.webhook';
  // const response = await fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify({ username, address, wish }),
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // if (!response.ok) {
  //   return res.status(500).send({ message: 'something went wrong.' });
  // }
  return res.status(200).send({ message: 'Request received.' });
});

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
