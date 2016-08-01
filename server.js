const express = require('express')
const path = require('path')
const app = express()
const buildPath = path.join(__dirname, 'build')

app.use(require('compression')())
app.use(require('body-parser').urlencoded({ extended: false }))

app.use(express.static(buildPath))

var routes = require("./routes/index.js");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);
app.use('/api/v1/output/', routes);

const port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('Server listening on port: ' + port)
})
