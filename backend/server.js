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