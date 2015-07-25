'use strict';

app.factory('browser', ['$window', function ($window) {

    var ua,
        browsers = {
            chrome: 'chrome',
            safari: 'safari',
            firefox: 'firefox',
            ie: 'ie'
        };

    function getUA() {
        if (!ua) {
            ua = calculateUA();
        }
        return ua;
    }

    function calculateUA() {
        var userAgent = $window.navigator.userAgent,
            browsers = getBrowserExpressions();
        for (var key in browsers) {
            if (!ua && browsers[key].test(userAgent)) {
                return key;
            }
        }
        return 'unknown';
    }

    function getBrowserExpressions() {
        var browserExpressions = {};
        browserExpressions[browsers.chrome] = /chrome/i;
        browserExpressions[browsers.safari] = /safari/i;
        browserExpressions[browsers.firefox] = /firefox/i;
        browserExpressions[browsers.ie] = /trident/i;
        return browserExpressions;
    }

    function isChrome() {
        return getUA() === browsers.chrome;
    }

    function isSafari() {
        return getUA() === browsers.safari;
    }

    function isFirefox() {
        return getUA() === browsers.firefox;
    }

    function isIE() {
        return getUA() === browsers.ie;
    }

    return {
        getUA: getUA,
        isChrome: isChrome,
        isSafari: isSafari,
        isFirefox: isFirefox,
        isIE: isIE
    };
}]);