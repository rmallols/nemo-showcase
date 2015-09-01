app.provider('captchaInput', [function () {
    return {
        template:   '<div>' +
                        '<captcha-mario on-dead="onDead()" on-level-complete="onLevelComplete()"></captcha-mario>' +
                    '</div>',
        linkFn: function (scope, element, attrs, nemoFormHandlerCtrl, fieldInterfaceFns) {

            function onEventReceived(eventKey) {
                fieldInterfaceFns.setValue({
                    levelComplete: eventKey === 'levelComplete'
                });
                fieldInterfaceFns.setFilthy();
                scope.$apply();
            }

            scope.onDead = function () {
                onEventReceived('dead');
            };

            scope.onLevelComplete = function () {
                onEventReceived('levelComplete');
            };
        },
        $get: angular.noop
    };
}]);