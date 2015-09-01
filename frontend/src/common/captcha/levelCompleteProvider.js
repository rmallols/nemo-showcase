app.provider('levelComplete', [function () {
    return {
        validateFn: function (value, validationRule) {
            return value === validationRule.value;
        },
        $get: angular.noop
    };
}]);