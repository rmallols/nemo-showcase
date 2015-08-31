app.provider('captchaInput', [function () {
    return {
        template:   '<div>' +
                        '<captcha-mario on-dead="onDead()" on-level-complete="onLevelComplete()"></captcha-mario>' +
                    '</div>',
        linkFn: function (scope, element, attrs, formHandlerCtrl, interfaceFns) {

            function onEventReceived(eventKey) {
                interfaceFns.setValue({
                    levelComplete: eventKey === 'levelComplete'
                });
                formHandlerCtrl.setFieldDirtyTouched('captcha');
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