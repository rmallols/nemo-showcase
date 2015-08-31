app.provider('levelComplete', [function () {
    return {
        validateFn: function (value, validationRule) {
            return value && value.levelComplete === validationRule.value;
        },
        $get: angular.noop
    };
}]);