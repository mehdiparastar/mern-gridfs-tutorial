const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

// connect to mongoose
mongoose.connect(config.db);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(logger('dev'));
// Put all API endpoints under '/api'
app.use('/api', require('./routes/file'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port);

console.log(`GridFS tutorial listening on ${port}`);