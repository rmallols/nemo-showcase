module.exports = {

    _mip: null,

    setup: function (mip) {
        console.log('***SETUP');
        this.setMip(mip);
    },

    setMip: function (mip) {
        this._mip = mip;
    },

    getMip: function () {
        return this._mip;
    },

    startTimeAndCallbackWhenReady: function (readyCallback) {
        var timeStart = 5;
        after((timeStart + 0.9).seconds(), function () {
            readyCallback();
        });
        return timeStart;
    },

    setChestLed: function (color, timeStart, timeLapse) {
        var mip = this.getMip(),
            periodTimeLapse = timeLapse / 2;
        timeStart += periodTimeLapse;
        after((timeStart).seconds(), function () {
            mip.setChestLED(color.r, color.g, color.b);
        });
        return timeStart + periodTimeLapse;
    },

    setGameMode: function (gameMode, timeStart, gap) {
        var mip = this.getMip();
        timeStart += gap;
        after((timeStart).seconds(), function () {
            mip.setGameMode(gameMode);
        });
        return timeStart;
    },
    
    turnLeft: function (angle, speed, timeStart, timeLapse) {
        var mip = this.getMip();
        timeStart += timeLapse;
        after((timeStart).seconds(), function () {
            mip.turnLeft(angle, speed);
        });        
        return timeStart;
    },

    turnRight: function (angle, speed, timeStart, timeLapse) {
        var mip = this.getMip();
        timeStart += timeLapse;
        after((timeStart).seconds(), function () {
            mip.turnRight(angle, speed);
        });        
        return timeStart;
    },

    danceBlock1: function (timeStart, specialTurnAngle, gap, specialFirstGap) {
        var defaultAngle = 20,
            defaultSpeed = 100,
            specialSpeed = 200;
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart, 0);
        timeStart = this.turnRight(defaultAngle, defaultSpeed, timeStart, specialFirstGap || gap);
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnRight(specialTurnAngle, specialSpeed, timeStart, gap);
        timeStart = this.turnLeft(specialTurnAngle, specialSpeed, timeStart, gap);
        timeStart = this.setGameMode(1, timeStart, gap);
        timeStart = this.setChestLed({r: 255, g: 255, b: 255}, timeStart, 1.4);
        return timeStart;
    },

    danceBlock2: function (timeStart, leftAngle, rightAngle) {
        var gap = 0.22;
        timeStart = this.turnLeft(leftAngle, 100, timeStart, 0);
        timeStart = this.turnRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnRight(rightAngle, 100, timeStart, gap);
        timeStart = this.setChestLed({r: 255, g: 0, b: 255}, timeStart, 0.5);
        return timeStart;
    },

    danceBlock3: function (timeStart, angle, speed) {
        this.turnLeft(angle, speed, timeStart, 0);
        timeStart = this.setChestLed({r: 0, g: 0, b: 255}, timeStart, 0.9);
        this.turnLeft(angle, speed, timeStart, 0);
        timeStart = this.setChestLed({r: 255, g: 255, b: 0}, timeStart, 0.9);
        this.turnRight(angle, speed, timeStart, 0);
        timeStart = this.setChestLed({r: 255, g: 0, b: 255}, timeStart, 0.5);
        this.turnRight(angle, speed, timeStart, 0);
        timeStart = this.setChestLed({r: 255, g: 0, b: 255}, timeStart, 0.3);
        return timeStart;
    },

    dance: function (readyCallback) {
        console.log('***DANCE');
        var timeStart;
        timeStart = this.startTimeAndCallbackWhenReady(readyCallback);
        timeStart = this.danceBlock1(timeStart, 160, 0.3, 1.2);
        timeStart = this.danceBlock1(timeStart, 165, 0.22);
        timeStart = this.danceBlock2(timeStart, 40, 20);
        timeStart = this.danceBlock2(timeStart, 20, 40);
        timeStart = this.danceBlock3(timeStart, 160, 200);
        timeStart = this.setGameMode(2, timeStart, 4);
        return timeStart;
    }
};