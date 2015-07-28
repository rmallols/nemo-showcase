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

var Cylon = require('cylon');

Cylon.robot({
    connections: {bluetooth: {adaptor: 'central', uuid: 'f60f821e12134e7c8bf0f54c7f271d38', module: 'cylon-ble'}},
    devices: {mip: {driver: 'mip'}},

    work: function (my) {
        console.log('heyy.!!')
        //DRIVE:
        //speed: 20 is all right. Too much and the robot will fall down
        //duration (ms)
        //my.mip.driveForward(100, 100);

        //1: fijo. 2: parpadeo lento. , 3: parpadea mas rapido. Cada numero es una de las cuatro luces
        //por este orden: 4er, 3o, 2o, 1o
        //my.mip.setHeadLED(2, 2, 2, 4);

        //rgb: 255 0 0 (rojo), 0 0 0 (negro), 255 255 255 (blanco), 255 0 255 (rosa), 0 0 255 (azul oscuro), 0 255 255 (azul claro), 255 255 0 (amarillo)
        //my.mip.setChestLED(255, 255, 0);

        //cuarto param: time on. Es una unidad rara, algo asi como 50 = 1 segundo
        //el quinto es cuanto tiempo esta apagada justo despues
        //con algo tipo 2 2 se consigue un flash muy chulo
        //my.mip.flashChestLED(255, 0, 255, 1, 1);

        //Esto es para que se este quieto, pero no hace nada (tal vez sea para eso, pero entonces no veo diferencia con stop
        //my.mip.getUp(5000);

        //primer arg: direccion (0 alante, 1 atras).
        //segundo: distancia. Vienen a ser centimetros
        //tercero: turn direction (0 izquierda, 1 derecha (ver siguiente))
        //cuatro: turn angle: GIRA EN GRADOS HACIA DONDE DIGAMOS EN EL PARAM ANTERIOR ANTES de empezar a andar
        //my.mip.driveDistance(0, 10, 1, 90);

        //primer: speed. 20 va mas o menos bien. 100 se case
        //segundo: duracion. Es algo asi como ms, pero no parece que vaya bien ya que nunca esta mas de 1 segundo
        //my.mip.driveForward(20, 1);
        //my.mip.driveBackward(20, 1000);

        //primer, radio de giro. OJO QUE NO SON GRADOS! hay que multiplicar por 4. es decir, 90 grados = vuelta entera (mas o menos
        //segundo: velocidad. 100 va rapido, y aunque pongas mas, no va mas
        //OJO porque si viene una nueva orden, cancela la anterior. Mira aqui, no llega a realizar el 100% del giro a izquierdas porque lo cancela a derechas
        //my.mip.turnLeft(90, 100);
        //after((2).seconds(), function () {
        //    my.mip.turnRight(90, 100);
        //});

        //1: dice algo
        //2: avanza y vacila
        //3: nada
        //4: baila a muerte
        //my.mip.setGameMode(1);

        after((2).seconds(), function() {
            my.mip.driveForward(50, 0);
            //my.mip.driveDistance(0, 100, 0, 0);
        });
        //
        after((6).seconds(), function() {
            my.mip.turnLeft(40, 100);
        });
        //
        //after((8).seconds(), function() {
        //    //my.mip.driveForward(50, 0);
        //    my.mip.driveDistance(0, 100, 0, 0);
        //});
        //
        //after((5).seconds(), function() {
        //    my.mip.turnRight(40, 100);
        //});

        //
        //after((7).seconds(), function() {
        //    my.mip.turnLeft(40, 100);
        //});
        //
        //after((7.5).seconds(), function() {
        //    my.mip.driveForward(50, 4000);
        //});
        //
        //after((10).seconds(), function() {
        //    my.mip.turnRight(40, 100);
        //});
        //
        //after((10.5).seconds(), function() {
        //    my.mip.turnLeft(1000, 50);
        //});
        //
        //after((12).seconds(), function() {
        //    my.mip.turnRight(2000, 50);
        //});


        //my.mip.setChestLED(1,0,0);
        //after((1).seconds(), function() {
        //    //my.mip.driveDistance(0, 10, 0, 0);
        //    //my.mip.setHeadLED(2, 2, 2, 2);
        //    my.mip.flashChestLED(255, 0, 0);
        //});
        //after((3).seconds(), function() {
        //    my.mip.setHeadLED(1, 1, 1, 1);
        //    my.mip.flashChestLED(255, 255, 0);
        //});
        //
        //after((4).seconds(), function () {
        //    my.mip.turnRight(90, 2)
        //});

        //after((5).seconds(), function () {
        //    my.mip.turnLeft(90, 2)
        //});
        //
        //after((6).seconds(), function () {
        //    my.mip.stop()
        //});
    }
}).start();