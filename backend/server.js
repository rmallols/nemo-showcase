var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    app = express(),
    bodyParser = require('body-parser'),
    cylonWrapper = require('./cylonWrapper'),
    dance = require('./dance'),
    port = process.env.PORT || 3001,
    validationTracking = {},
    server;

app
    .use(express.static(__dirname + '/../frontend'))
    .use(bodyParser.json());

server = http.createServer(app).listen(port, function () {
    console.log("listening on HTTP on port " + port);
});

cylonWrapper.setup(function (mip) {
    dance.setup(mip);
});

app.get(['/', '/stats', '/thanks', '/credits'], function (req, res) {
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

app.post('/rest/submitForm', function (req, res) {
    if(req.body.username === 'test') {
        manageFieldErrorResponse(res, 'username', 'taken', 'Ey! that username has been already taken');
    } else if(req.body.email === 'marty@mcfly.com') {
        manageFieldErrorResponse(res, 'email', 'taken', 'Ey! that email has been already taken');
    } else {
        manageSuccessErrorResponse(res);
    }
});

function manageFieldErrorResponse(res, field, code, message) {
    var status = 500,
        body = { field: field, code: code, message: message };
    if(dance.isRobotReady()) {
        dance.sad(function () {
            res.status(status).send(body);
        });
    } else {
        res.status(status).send(body);
    }
}

function manageSuccessErrorResponse(res) {
    if(dance.isRobotReady()) {
        dance.dance(function ready() {
            res.status(200).send({});
        });
    }
}