const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');

const port = process.env.PORT;

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'release')));

const server = http.createServer(app);
server.listen(port, function(){
    console.log("angularjs listens on port", port);
})