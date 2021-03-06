app.controller('HomeFormHandlerCtrl', ['$scope', '$http', '$state', '$location', 'Home', 'Audio', 'Stats', 'Loading',
function ($scope, $http, $state, $location, Home, Audio, Stats, Loading) {

    var formHandlerCtrl,
        self = this,
        iconHoverStates = {},
        messageTypes = { valid: 'valid', error: 'error', help: 'help' };

    $scope.setup = function (nemoFormHandlerCtrl) {
        formHandlerCtrl = nemoFormHandlerCtrl;
        $scope.isFormValid = formHandlerCtrl.isFormValid;
        $scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;
        if($location.search().autofill === 'true') {
            self.autofill();
        }
    };

    $scope.getFieldStyleClasses = function (fieldName, fieldType) {
        var styleClasses = {
            'row': true,
            'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
            'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
        };
        styleClasses['row_' + fieldType] = true;
        return styleClasses;
    };

    $scope.getMessageType = function (fieldName) {
        var messageType,
            isValid = formHandlerCtrl.isFieldValid(fieldName),
            isTouched = formHandlerCtrl.isFieldTouched(fieldName),
            hasHelp = formHandlerCtrl.hasHelp(fieldName);
        if(isTouched) {
            messageType = isValid ? messageTypes.valid : messageTypes.error;
        } else if(hasHelp) {
            messageType = messageTypes.help;
        }
        return messageType;
    };

    $scope.onIconHover = function (fieldName) {
        iconHoverStates[fieldName] = true;
    };

    $scope.onIconBlur = function (fieldName) {
        iconHoverStates[fieldName] = false;
    };

    $scope.isErrorMessageVisible = function (fieldName) {
        return isMessageVisible(fieldName, messageTypes.error);
    };

    $scope.isHelpMessageVisible = function (fieldName) {
        return isMessageVisible(fieldName, messageTypes.help);
    };

    $scope.isHoveredAndNotActive = function (fieldName) {
        return iconHoverStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
    };

    $scope.submit = function () {
        formHandlerCtrl.validateFormAndSetDirtyTouched();
        Stats.submitValidationTracking(formHandlerCtrl.getValidationTracking());
        if ($scope.isFormValid()) {
            submitForm();
        } else {
            formHandlerCtrl.giveFirstInvalidFieldFocus();
        }
    };

    this.autofill = function () {
        var unregisterFn = $scope.$watch('fields', function (fields) {
            if(fields) {
                formHandlerCtrl.setFieldValue('title', 'Mr value');
                formHandlerCtrl.setFieldValue('firstName', 'Marty');
                formHandlerCtrl.setFieldValue('lastName', 'McFly');
                formHandlerCtrl.setFieldValue('email', 'marty@mcfly.com');
                formHandlerCtrl.setFieldValue('password', 'foofoofoo');
                formHandlerCtrl.setFieldValue('terms', true);
                unregisterFn();
            }
        });
    };

    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function submitForm() {
        Loading.startLoading();
        Home.submitForm(formHandlerCtrl.getFieldsValues())
            .then(onSubmitFormSuccess)
            .catch(onSubmitFormError);
    }

    function onSubmitFormSuccess() {
        Loading.stopLoading();
        Audio.playSuccessSong();
        $state.go('thanks');
    }

    function onSubmitFormError(error) {
        Loading.stopLoading();
        formHandlerCtrl.forceServerFieldInvalid(error.data.field, error.data.message, capitalise(error.data.code));
        formHandlerCtrl.giveFirstInvalidFieldFocus();
        Stats.submitValidationTracking(formHandlerCtrl.getValidationTracking());
    }

    function isMessageVisible(fieldName, messageType) {
        var currentMessageType = $scope.getMessageType(fieldName),
            isActive = formHandlerCtrl.isFieldActive(fieldName),
            isActiveAndError = isActive && messageType === messageTypes.error,
            isIconHovered = iconHoverStates[fieldName];
        return currentMessageType === messageType && (isActiveAndError || isIconHovered);
    }
}]);
