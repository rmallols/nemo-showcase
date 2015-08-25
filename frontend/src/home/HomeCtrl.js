app
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get('/rest/getFormData').then(function (response) {
            $scope.fields = response.data;
        });
    }])

    .controller('HomeFormHandlerCtrl', ['$scope', function ($scope) {

        var formHandlerCtrl;

        var iconVisibilityStates = {}, messageTypes = { error: 'error', help: 'help' };

        $scope.setup = function (nemoFormHandlerCtrl) {
            formHandlerCtrl = nemoFormHandlerCtrl;
            $scope.isFormValid = formHandlerCtrl.isFormValid;
            $scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;
        };

        $scope.getFieldStyleClasses = function (fieldName) {
            return {
                'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
                'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
            };
        };

        $scope.getMessageType = function (fieldName) {
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

        $scope.onIconHover = function (fieldName) {
            iconVisibilityStates[fieldName] = true;
        };

        $scope.onIconBlur = function (fieldName) {
            iconVisibilityStates[fieldName] = false;
        };

        $scope.isErrorMessageVisible = function (fieldName) {
            return isMessageVisible(fieldName, messageTypes.error);
        };

        $scope.isHelpMessageVisible = function (fieldName) {
            return isMessageVisible(fieldName, messageTypes.help);
        };

        $scope.isHoveredAndNotActive = function (fieldName) {
            return iconVisibilityStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
        };

        $scope.fakeSubmit = function () {
            //Send the data here
            $http.post('/rest/submitForm', formHandlerCtrl.getFieldsValues()).then(function (response) {
                Audio.playSuccessSong();
            }).catch(function (error) {
                console.log('ERRORS!!!', error.data)

                formHandlerCtrl.forceServerFieldInvalid(error.data.field, error.data.message, '.' + error.data.code);
                Stats.submitvalidationTracking(formHandlerCtrl.getValidationTracking());

            });



            formHandlerCtrl.validateFormAndSetDirtyTouched();
            if ($scope.isFormValid()) {
                formHandlerCtrl.forceInvalid('captcha.invalid');
                formHandlerCtrl.giveFirstInvalidFieldFocus();
            } else {
                formHandlerCtrl.giveFirstInvalidFieldFocus();
            }
        };

        function isMessageVisible(fieldName, messageType) {
            var currentMessageType = $scope.getMessageType(fieldName),
                isActive = formHandlerCtrl.isFieldActive(fieldName),
                isIconHovered = iconVisibilityStates[fieldName];
            return currentMessageType === messageType && (isActive || isIconHovered);
        }
    }])

    .directive('homeFormHandler', ['$http', 'Stats', 'Audio', function ($http, Stats, Audio) {
        return {
            require: 'nemoFormHandler',
            controller: 'HomeFormHandlerCtrl',
            link: function (scope, element, attrs, formHandlerCtrl) {

                scope.setup(formHandlerCtrl);
            }
        }
    }]);