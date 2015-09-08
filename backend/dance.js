module.exports = {

    _mip: undefined,

    _colors: {
        white: {r: 255, g: 255, b: 255},
        red: {r: 255, g: 0, b: 0},
        green: {r: 0, g: 255, b: 0},
        blue: {r: 0, g: 0, b: 255},
        yellow: {r: 255, g: 255, b: 0},
        purple: {r: 255, g: 0, b: 255}
    },

    _gameModes: {
        surprised: 1,
        yeah: 2,
        sad: 5
    },

    isRobotReady: function () {
        return this.getMip() !== undefined;
    },

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

    stop: function(timeStart) {
        var mip = this.getMip();
        after((timeStart || 0).seconds(), function () {
            mip.stop();
        });
    },

    startTimeAndCallbackWhenReady: function (readyCallback) {
        var timeStart = 1;
        after((timeStart + 0.9).seconds(), function () {
            if(readyCallback) {
                readyCallback();
            }
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
        timeStart = this.setGameMode(this._gameModes.surprised, timeStart, gap);
        timeStart = this.setChestLed(this._colors.white, timeStart, 1.4);
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
        timeStart = this.setChestLed(this._colors.purple, timeStart, 0.5);
        return timeStart;
    },

    danceBlock3: function (timeStart, angle, speed) {
        this.turnLeft(angle, speed, timeStart, 0);
        timeStart = this.setChestLed(this._colors.blue, timeStart, 0.9);
        this.turnLeft(angle, speed, timeStart, 0);
        timeStart = this.setChestLed(this._colors.yellow, timeStart, 0.9);
        this.turnRight(angle, speed, timeStart, 0);
        timeStart = this.setChestLed(this._colors.purple, timeStart, 0.5);
        this.turnRight(angle, speed, timeStart, 0);
        timeStart = this.setChestLed(this._colors.purple, timeStart, 0.3);
        return timeStart;
    },

    dance: function (readyCallback) {
        var timeStart;
        timeStart = this.startTimeAndCallbackWhenReady(readyCallback);
        timeStart = this.danceBlock1(timeStart, 160, 0.3, 1.2);
        timeStart = this.danceBlock1(timeStart, 165, 0.22);
        timeStart = this.danceBlock2(timeStart, 40, 20);
        timeStart = this.danceBlock2(timeStart, 20, 40);
        timeStart = this.danceBlock3(timeStart, 160, 200);
        timeStart = this.setGameMode(this._gameModes.yeah, timeStart, 4);
        return timeStart;
    },

    sad: function (readyCallback) {
        var timeStart,
            turn = {
                angle: 20,
                speed: 100,
                gap: 0.22,
                specialFirstGap: 1.2
            },
            chestLed = {
                firstGap: 2,
                lastGap: 3
            },
            gameMode = {
                gap: 1.5
            };

        timeStart = this.startTimeAndCallbackWhenReady(readyCallback);
        timeStart = this.setChestLed(this._colors.red, timeStart, chestLed.firstGap);
        timeStart = this.turnRight(turn.angle, turn.speed, timeStart, turn.specialFirstGap);
        timeStart = this.turnLeft(turn.angle, turn.speed, timeStart, turn.gap);
        timeStart = this.turnRight(turn.angle, turn.speed, timeStart, turn.gap);
        timeStart = this.turnLeft(turn.angle, turn.speed, timeStart, turn.gap);
        timeStart = this.turnRight(turn.angle, turn.speed, timeStart, turn.gap);
        timeStart = this.setGameMode(this._gameModes.sad, timeStart, gameMode.gap);
        timeStart = this.setChestLed(this._colors.green, timeStart, chestLed.lastGap);

        return timeStart;
    }
};