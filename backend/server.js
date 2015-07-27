var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../frontend'));

http.createServer(app).listen(port, function () {
    console.log("listening on HTTP on port " + port);
});

app.get(['/'], function (req, res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
});

app.get('/rest/getFormData', function (req, res) {
    var status, body;
    fs.readFile(__dirname + '/../backend/data/formData.json', 'utf8', function (err,data) {
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