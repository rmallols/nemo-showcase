var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3001;

app
    .use(express.static(__dirname + '/../frontend'))
    .use(bodyParser.json());

var validationTracking = {};

var server = http.createServer(app).listen(port, function () {
    console.log("listening on HTTP on port " + port);
});

app.get(['/', '/stats'], function (req, res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
});

app.get('/rest/getFormData', function (req, res) {
    var status, body;
    fs.readFile(__dirname + '/../backend/data/formData.json', 'utf8', function (err, data) {
        if (err) {
            status = 500;
            body = err;
        } else {
            status = 200;
            body = JSON.parse(data);
        }
        res.status(status).send(body);
    });
});

app.get('/rest/validation/track', function (req, res) {
    res.send(validationTracking);
});

app.post('/rest/validation/track', function (req, res) {
    validationTracking = req.body;
    res.send({});
});

var Cylon = require('cylon'),
    dance = require('./dance');

Cylon.robot({

    connections: {bluetooth: {adaptor: 'central', uuid: 'f33df04bcb49425d83eeef3b9c07563d', module: 'cylon-ble'}},
    devices: {mip: {driver: 'mip'}},

    work: function (my) {
        dance.setup(my);
    }
}).start();

setTimeout(function () {
    dance.dance();
}, 4000);


// Maintain a hash of all connected sockets
var sockets = {}, nextSocketId = 0;
server.on('connection', function (socket) {
    // Add a newly connected socket
    var socketId = nextSocketId++;
    sockets[socketId] = socket;
    console.log('socket', socketId, 'opened');

    // Remove the socket when it closes
    socket.on('close', function () {
        console.log('socket', socketId, 'closed');
        delete sockets[socketId];
    });

    // Extend socket lifetime for demo purposes
    socket.setTimeout(4000);
});

