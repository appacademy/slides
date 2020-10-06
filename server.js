const express = require('express');
const app = express();

if (!process.env.LECTURE_PATH) {
  console.error(`
    WARNING: Using default lecture slides in the README.
    Set LECTURE_PATH environment variable before running this file.
    See README for more instructions
  `);
} else {
  const populateLecture = require('./scripts/populate-lecture');
  populateLecture();
}

app.get('/', function(_req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/assets', express.static('assets'));

const PORT = 8080;

app.listen(PORT, function () {
  console.log("Listening on port", PORT);
});
