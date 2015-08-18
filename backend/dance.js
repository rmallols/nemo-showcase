var my;

function step1(mip, timeStart, turnAngle, gap, specialFirstGap) {
    console.log('running timestamp with step at', timeStart, gap);


    after((timeStart).seconds(), function() {
        mip.turnLeft(20, 100);
    });

    timeStart += specialFirstGap || gap;
    after((timeStart).seconds(), function() {
        mip.turnRight(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnLeft(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnRight(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnLeft(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnRight(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnLeft(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnRight(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnLeft(20, 100);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnRight(turnAngle, 200);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.turnLeft(turnAngle, 200);
    });

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.setGameMode(1);
    });

    return timeStart;

}

function step2(mip, timeStart) {
    //after((timeStart).seconds(), function() {
    //    mip.driveForward(30, 0);
    //    //mip.driveDistance(0, 100, 0, 0);
    //});
    //
    //timeStart += 2.8;
    //after((timeStart).seconds(), function() {
    //    mip.driveBackward(30, 0);
    //});
    //
    //timeStart += 1.8;
    //after((timeStart).seconds(), function () {
    //    mip.stop();
    //});
    console.log('moving...', timeStart);
    after((timeStart).seconds(), function() {
        mip.driveDistance(1, 30, 1, 100);
    });

    timeStart += 2.0;
    after((timeStart).seconds(), function() {
        //mip.stop();
        mip.driveDistance(0, 30, 0, 100);
    });

    timeStart += 3.0;
    after((timeStart).seconds(), function() {
        mip.turnLeft(180, 200);
    });

    timeStart += 2;
    after((timeStart).seconds(), function() {
        mip.turnRight(180, 200);
    });
}

function step3(mip, timeStart) {

    var speed = 30,
        gap = 0.7,
        action;

    for(var i = 0; i < 5; i++) {
        timeStart += gap;
        action = (i % 2) ? 'driveForward' : 'driveBackward';
        performAction(mip, timeStart, action, speed);
    }

    timeStart += gap;
    after((timeStart).seconds(), function() {
        mip.stop();
    });

    return timeStart;
}

function performAction(mip, timeStart, action, speed) {
    after((timeStart).seconds(), function() {
        mip[action](speed, 150);
    });
}

module.exports = {

    setup: function(retrievedMy) {
        console.log('***************SETUP');
        my = retrievedMy;
    },

    dance: function () {
        console.log('***************DANCE');
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


        var timeStart = 0;
        timeStart = step1(my.mip, timeStart, 160, 0.3, 1.2);

        timeStart += 1.4;
        timeStart = step1(my.mip, timeStart, 165, 0.22);

        //timeStart += 3.0;
        //
        //step2(my.mip, timeStart);
        timeStart += 1.5;
        timeStart = step3(my.mip, timeStart);

        timeStart += 1.2;
        timeStart = step1(my.mip, timeStart, 160, 0.3, 1.2);


        timeStart += 1.4;
        timeStart = step1(my.mip, timeStart, 165, 0.22);
    }
}