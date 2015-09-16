app.provider('captchaMario', [function () {
    return {
        template:   '<div>' +
                        '<captcha-mario ' +
                            'on-dead="onDead()" ' +
                            'on-level-complete="onLevelComplete()">' +
                        '</captcha-mario>' +
                    '</div>',
        link: function (scope, element, attrs, fieldInterfaceFns) {

            function manageStateChange (value) {
                fieldInterfaceFns.setValue(value);
                fieldInterfaceFns.setFilthy();
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