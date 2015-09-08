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

app.get(['/', '/thanks', '/stats'], function (req, res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
});

app.get('/rest/formSetup', function (req, res) {
    var status, body;
    fs.readFile(__dirname + '/../backend/setup/form.json', 'utf8', function (err, data) {
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

try {

    var Cylon = require('cylon'),
        dance = require('./dance');

    app.post('/rest/submitForm', function (req, res) {

        var status, body = {};

        if(req.body.username === 'test') {
            status = 500;
            body = {
                field: 'username',
                code: 'taken',
                message: 'Ey! that username has been already taken'
            };
            if(dance.isRobotReady()) {
                dance.sad(function () {
                    res.status(status).send(body);
                });
            } else {
                res.status(status).send(body);
            }
        } else if(req.body.email === 'foo@bar.com') {
            status = 500;
            body = {
                field: 'email',
                code: 'taken',
                message: 'Ey! that email has been already taken'
            };
            if(dance.isRobotReady()) {
                dance.sad(function () {
                    res.status(status).send(body);
                });
            } else {
                res.status(status).send(body);
            }

        } else {
            if(dance.isRobotReady()) {
                dance.dance(function ready() {
                    status = 200;
                    res.status(status).send(body);
                });
            }
        }
    });



    Cylon.robot({

        connections: {bluetooth: {adaptor: 'central', uuid: 'f33df04bcb49425d83eeef3b9c07563d', module: 'cylon-ble'}},
        devices: {mip: {driver: 'mip'}},

        work: function (my) {
            dance.setup(my.mip);
        }
    }).start();

} catch(ex) {

}
