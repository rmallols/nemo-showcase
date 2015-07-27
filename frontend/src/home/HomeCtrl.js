app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('/rest/getFormData').then(function (response) {
        $scope.fields = response.data;
    });
}])
    .directive('fakeFormHandler', [function () {
        return {
            require: 'nemoFormHandler',
            link: function (scope, element, attrs, formHandlerCtrl) {

                var iconVisibilityStates = {};

                scope.fakeSubmit = function () {
                    formHandlerCtrl.validateFormAndSetDirtyTouched();
                    if (scope.isFormValid()) {
                        formHandlerCtrl.forceInvalid('captcha.invalid');
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    } else {
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    }
                };

                scope.isFormValid = formHandlerCtrl.isFormValid;


                scope.getFieldStyleClasses = function (fieldName) {
                    return {
                        'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
                        'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
                    };
                };

                scope.onErrorIconHover = function (fieldName) {
                    iconVisibilityStates[fieldName] = true;
                };

                scope.onErrorIconBlur = function (fieldName) {
                    iconVisibilityStates[fieldName] = false;
                };

                scope.isErrorIconVisible = function (fieldName) {
                    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                        isTouched = formHandlerCtrl.isFieldTouched(fieldName);
                    return isInvalid && isTouched;
                };

                scope.isErrorMessageVisible = function (fieldName) {
                    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                        isActive = formHandlerCtrl.isFieldActive(fieldName),
                        isTouched = formHandlerCtrl.isFieldTouched(fieldName),
                        isErrorIconHovered = iconVisibilityStates[fieldName];
                    return isInvalid && (isErrorIconHovered || (isActive && isTouched));
                };

                scope.isHoveredAndNotActive = function (fieldName) {
                    return iconVisibilityStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
                };

                scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;
            }
        }
    }]);