app
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get('/rest/getFormData').then(function (response) {
            $scope.fields = response.data;
        });
}])
    .directive('fakeFormHandler', ['Stats', function (Stats) {
        return {
            require: 'nemoFormHandler',
            link: function (scope, element, attrs, formHandlerCtrl) {

                var iconVisibilityStates = {}, messageTypes = { error: 'error', help: 'help' };

                scope.isFormValid = formHandlerCtrl.isFormValid;

                scope.getFieldStyleClasses = function (fieldName) {
                    return {
                        'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
                        'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
                    };
                };

                scope.getMessageType = function (fieldName) {
                    var iconType,
                        isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                        isTouched = formHandlerCtrl.isFieldTouched(fieldName),
                        hasHelp = formHandlerCtrl.hasHelp(fieldName);
                    if(isInvalid && isTouched) {
                        iconType = messageTypes.error;
                    } else if(hasHelp) {
                        iconType = messageTypes.help;
                    }
                    return iconType;
                };

                scope.onIconHover = function (fieldName) {
                    iconVisibilityStates[fieldName] = true;
                };

                scope.onIconBlur = function (fieldName) {
                    iconVisibilityStates[fieldName] = false;
                };

                scope.isErrorMessageVisible = function (fieldName) {
                    return isMessageVisible(fieldName, messageTypes.error);
                };

                scope.isHelpMessageVisible = function (fieldName) {
                    return isMessageVisible(fieldName, messageTypes.help);
                };

                scope.isHoveredAndNotActive = function (fieldName) {
                    return iconVisibilityStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
                };

                scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;

                function isMessageVisible(fieldName, messageType) {
                    var currentMessageType = scope.getMessageType(fieldName),
                        isActive = formHandlerCtrl.isFieldActive(fieldName),
                        isIconHovered = iconVisibilityStates[fieldName];
                    return currentMessageType === messageType && (isActive || isIconHovered);
                }

                //var iconVisibilityStates = {};
                //
                //scope.fakeSubmit = function () {
                //    Stats.submitvalidationTracking(formHandlerCtrl.getValidationTracking());
                //    formHandlerCtrl.validateFormAndSetDirtyTouched();
                //    if (scope.isFormValid()) {
                //        formHandlerCtrl.forceInvalid('captcha.invalid');
                //        formHandlerCtrl.giveFirstInvalidFieldFocus();
                //    } else {
                //        formHandlerCtrl.giveFirstInvalidFieldFocus();
                //    }
                //};
                //
                //scope.isFormValid = formHandlerCtrl.isFormValid;
                //
                //scope.getFieldStyleClasses = function (fieldName) {
                //    return {
                //        'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
                //        'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
                //    };
                //};
                //
                //scope.onErrorIconHover = function (fieldName) {
                //    iconVisibilityStates[fieldName] = true;
                //};
                //
                //scope.onErrorIconBlur = function (fieldName) {
                //    iconVisibilityStates[fieldName] = false;
                //};
                //
                //scope.isErrorIconVisible = function (fieldName) {
                //    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                //        isTouched = formHandlerCtrl.isFieldTouched(fieldName);
                //    return isInvalid && isTouched;
                //};
                //
                //scope.isErrorMessageVisible = function (fieldName) {
                //    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                //        isActive = formHandlerCtrl.isFieldActive(fieldName),
                //        isTouched = formHandlerCtrl.isFieldTouched(fieldName),
                //        isErrorIconHovered = iconVisibilityStates[fieldName];
                //    return isInvalid && (isErrorIconHovered || (isActive && isTouched));
                //};
                //
                //scope.isHoveredAndNotActive = function (fieldName) {
                //    return iconVisibilityStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
                //};
                //
                //scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;
            }
        }
    }]);