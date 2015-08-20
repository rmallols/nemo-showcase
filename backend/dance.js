module.exports = {

    _mip: null,

    setup: function (mip) {
        console.log('***SETUP')
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

    setChestLed: function (color, timeStart) {
        var mip = this.getMip();
        after((timeStart).seconds(), function () {
            mip.setChestLED(color.r, color.g, color.b);
        });
    },

    setLapsedChestLed: function (color, timeStart, timeLapse) {
        var periodTimeLapse = timeLapse / 2;
        timeStart += periodTimeLapse;
        this.setChestLed({r: 255, g: 255, b: 255}, timeStart);
        return timeStart + periodTimeLapse;
    },

    setLapsedGameMode: function (gameMode, timeStart, gap) {
        var mip = this.getMip();
        timeStart += gap;
        after((timeStart).seconds(), function () {
            mip.setGameMode(gameMode);
        });
        return timeStart;
    },

    turnLeft: function (angle, speed, timeStart) {
        var mip = this.getMip();
        after((timeStart).seconds(), function () {
            mip.turnLeft(angle, speed);
        });
        return timeStart;
    },

    turnLapsedLeft: function (angle, speed, timeStart, timeLapse) {
        timeStart += timeLapse;
        this.turnLeft(angle, speed, timeStart);
        return timeStart;
    },

    turnRight: function (angle, speed, timeStart) {
        var mip = this.getMip();
        after((timeStart).seconds(), function () {
            mip.turnRight(angle, speed);
        });
        return timeStart;
    },

    turnLapsedRight: function (angle, speed, timeStart, timeLapse) {
        timeStart += timeLapse;
        this.turnRight(angle, speed, timeStart);
        return timeStart;
    },

    danceBlock1: function (timeStart, turnAngle, gap, specialFirstGap) {
        var defaultAngle = 20,
            defaultSpeed = 100;
        timeStart = this.turnLeft(defaultAngle, defaultSpeed, timeStart);
        timeStart = this.turnLapsedRight(defaultAngle, defaultSpeed, timeStart, specialFirstGap || gap);
        timeStart = this.turnLapsedLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedRight(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedLeft(defaultAngle, defaultSpeed, timeStart, gap);
        timeStart = this.turnLapsedRight(turnAngle, 200, timeStart, gap);
        timeStart = this.turnLapsedLeft(turnAngle, 200, timeStart, gap);
        timeStart = this.setLapsedGameMode(1, timeStart, gap);
        timeStart = this.setLapsedChestLed({r: 255, g: 255, b: 255}, timeStart, 1.4);
        return timeStart;
    },

    danceBlock2: function (timeStart, leftAngle, rightAngle) {
        var gap = 0.22;
        timeStart = this.turnLapsedLeft(leftAngle, 100, timeStart, 0);
        timeStart = this.turnLapsedRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedRight(rightAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedLeft(leftAngle, 100, timeStart, gap);
        timeStart = this.turnLapsedRight(rightAngle, 100, timeStart, gap);
        timeStart = this.setLapsedChestLed({r: 255, g: 0, b: 255}, timeStart, 0.5);
        return timeStart;
    },

    danceBlock3: function (timeStart, angle, speed) {
        this.turnLeft(angle, speed, timeStart);
        timeStart = this.setLapsedChestLed({r: 0, g: 0, b: 255}, timeStart, 0.9);
        this.turnLeft(angle, speed, timeStart);
        timeStart = this.setLapsedChestLed({r: 255, g: 255, b: 0}, timeStart, 0.9);
        this.turnRight(angle, speed, timeStart);
        timeStart = this.setLapsedChestLed({r: 255, g: 0, b: 255}, timeStart, 0.5);
        this.turnRight(angle, speed, timeStart);
        timeStart = this.setLapsedChestLed({r: 255, g: 0, b: 255}, timeStart, 0.3);
        return timeStart;
    },

    dance: function (readyCallback) {
        console.log('***DANCE')
        var timeStart;
        timeStart = this.startTimeAndCallbackWhenReady(readyCallback);
        timeStart = this.danceBlock1(timeStart, 160, 0.3, 1.2);
        timeStart = this.danceBlock1(timeStart, 165, 0.22);
        timeStart = this.danceBlock2(timeStart, 40, 20);
        timeStart = this.danceBlock2(timeStart, 20, 40);
        timeStart = this.danceBlock3(timeStart, 160, 200);
        timeStart = this.setLapsedGameMode(2, timeStart, 4);
        return timeStart;
    }
};