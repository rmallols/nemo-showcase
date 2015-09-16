app.provider('levelComplete', [function () {
    return {
        validate: function (value, validationRule) {
            return value === validationRule.value;
        },
        $get: angular.noop
    };
}]);