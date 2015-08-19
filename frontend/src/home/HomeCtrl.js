app
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get('/rest/getFormData').then(function (response) {
            $scope.fields = response.data;
        });
}])
    .directive('fakeFormHandler', ['$http', 'Stats', 'Audio', function ($http, Stats, Audio) {
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

                scope.fakeSubmit = function () {
                    //Send the data here
                    $http.post('/rest/submitForm').then(function (response) {
                        Audio.playSuccessSong();
                    });
                    Stats.submitvalidationTracking(formHandlerCtrl.getValidationTracking());
                    formHandlerCtrl.validateFormAndSetDirtyTouched();
                    if (scope.isFormValid()) {
                        formHandlerCtrl.forceInvalid('captcha.invalid');
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    } else {
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    }
                };

                scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;

                function isMessageVisible(fieldName, messageType) {
                    var currentMessageType = scope.getMessageType(fieldName),
                        isActive = formHandlerCtrl.isFieldActive(fieldName),
                        isIconHovered = iconVisibilityStates[fieldName];
                    return currentMessageType === messageType && (isActive || isIconHovered);
                }
            }
        }
    }]);