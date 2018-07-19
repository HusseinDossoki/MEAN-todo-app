const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const mongoose    = require('mongoose');
const cors        = require('cors');
const database    = require('./server/config/database');


// define app
const app = express();

// connect to database
mongoose.connect(database.url, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
  console.log('connected to database ...');
}).on('error', (err) => {
  console.log(err);
});

// cors
app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// angular dist output folder
app.use(express.static(path.join(__dirname, 'dist')));


// routes
const apiRoute = require('./server/routes/api');
app.use('/api', apiRoute);

// send all other requests to the angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port} .....`);
});

