const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const countryRoutes = require('./queries');
const cors = require('cors');

app.use(bodyParser.json())

app.use("/country", countryRoutes)

app.use(bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());
app.options('*', cors()); // include before other routes

// GET Request to root URL (/)

app.use("/",countryRoutes); // mount the countryRoutes on the app

app.listen(3001, () => {
  console.log(`App running on port ${3001}.`)
})

module.exports = app;