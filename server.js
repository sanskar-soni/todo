const express = require('express');
const app = express();
const port = 3001;

app.get('/msg', (req, res) => {
  res.send('Hello World!');
});

app.get('/check', (req, res) => {
  console.log(req);
  res.send('Success');
});

app.listen(port, () => {
  console.log('Server is running on port '+port);
});
