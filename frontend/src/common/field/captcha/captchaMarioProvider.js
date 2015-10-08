app.provider('captchaMario', [function () {
    return {
        template:   '<div>' +
                        '<captcha-mario ' +
                            'on-dead="onDead()" ' +
                            'on-level-complete="onLevelComplete()">' +
                        '</captcha-mario>' +
                    '</div>',
        link: function (scope, element, attrs, fieldInterfaceCtrl) {

            function manageStateChange (value) {
                fieldInterfaceCtrl.setValue(value);
                fieldInterfaceCtrl.setFilthy();
            }

            scope.onDead = function () {
                manageStateChange(false);
            };

            scope.onLevelComplete = function () {
                manageStateChange(true);
            };
        },
        $get: angular.noop
    };
}]);