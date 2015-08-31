app
    .controller('HomeCtrl', ['$scope', '$http', 'Home', function ($scope, $http, Home) {
        Home.getFormSetup().then(function (response) {
            $scope.fields = response.data;
        });
    }])

    .controller('HomeFormHandlerCtrl', ['$scope', '$http', 'Audio', 'Stats', 'Loading',
    function ($scope, $http, Audio, Stats, Loading) {

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
            var messageType,
                isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                isTouched = formHandlerCtrl.isFieldTouched(fieldName),
                hasHelp = formHandlerCtrl.hasHelp(fieldName);
            if(isInvalid && isTouched) {
                messageType = messageTypes.error;
            } else if(hasHelp) {
                messageType = messageTypes.help;
            }
            return messageType;
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

        $scope.submit = function () {
            formHandlerCtrl.validateFormAndSetDirtyTouched();
            if ($scope.isFormValid()) {
                submitForm();
            } else {
                formHandlerCtrl.giveFirstInvalidFieldFocus();
            }
        };

        function submitForm() {
            Loading.startLoading();
            Home.submitForm(formHandlerCtrl.getFieldsValues())
                .then(onSubmitFormSuccess)
                .catch(onSubmitFormError);
        }

        function onSubmitFormSuccess() {
            console.log('SHOULD REDIRECT TO THANKS!');
            Loading.stopLoading();
            Audio.playSuccessSong();
        }

        function onSubmitFormError() {
            Loading.stopLoading();
            formHandlerCtrl.forceServerFieldInvalid(error.data.field, error.data.message, '.' + error.data.code);
            Stats.submitvalidationTracking(formHandlerCtrl.getValidationTracking());
        }

        function isMessageVisible(fieldName, messageType) {
            var currentMessageType = $scope.getMessageType(fieldName),
                isActive = formHandlerCtrl.isFieldActive(fieldName),
                isIconHovered = iconVisibilityStates[fieldName];
            return currentMessageType === messageType && (isActive || isIconHovered);
        }
    }])

    .directive('homeFormHandler', [function () {
        return {
            require: 'nemoFormHandler',
            controller: 'HomeFormHandlerCtrl',
            link: function (scope, element, attrs, formHandlerCtrl) {

                scope.setup(formHandlerCtrl);
            }
        }
    }]);