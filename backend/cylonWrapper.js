var cylon = require('cylon');

module.exports = {

    _getConnections: function () {
        return {
            bluetooth: {
                adaptor: 'central',
                uuid: 'f33df04bcb49425d83eeef3b9c07563d',
                module: 'cylon-ble'
            }
        };
    },

    _getDevices: function () {
        return {
            mip: {
                driver: 'mip'
            }
        };
    },

    setup: function (callback) {
        cylon.robot({
            connections: this._getConnections(),
            devices: this._getDevices(),
            work: function (my) {
                callback(my.mip);
            }
        }).start();
    }
};