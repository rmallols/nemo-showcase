describe('HomeFormHandlerCtrl', function () {

    var $scope = {}, nemoFormHandlerCtrl;

    beforeEach(function () {
        module('app');
        nemoFormHandlerCtrl = {
            isFormValid: sinon.stub(),
            getFieldNgModelCtrl: sinon.stub(),
            isFieldTouched: sinon.stub(),
            isFieldValid: sinon.stub(),
            isFieldActive: sinon.stub(),
            hasHelp: sinon.stub(),
            validateFormAndSetDirtyTouched: sinon.stub(),
            giveFirstInvalidFieldFocus: sinon.stub(),
            getFieldsValues: sinon.stub(),
            forceServerFieldInvalid: sinon.stub(),
            getValidationTracking: sinon.stub()
        };
        compileController('HomeFormHandlerCtrl', {$scope: $scope});
        $scope.setup(nemoFormHandlerCtrl);
    });

    function setIconVisibility(isIconVisible, fieldName) {
        if(isIconVisible) {
            $scope.onIconHover(fieldName);
        } else {
            $scope.onIconBlur(fieldName);
        }
    }

    describe('isFormValid', function () {

        it('must set into the $scope the isFormValid function from the Nemo', function () {

            var isFormValid;

            given:
                nemoFormHandlerCtrl.isFormValid.returns(false);

            when:
                isFormValid = $scope.isFormValid();

            then:
                expect(isFormValid).toBe(false);
        });
    });

    describe('getFieldNgModelCtrl', function () {

        it('must set into the $scope the getFieldNgModelCtrl function from the Nemo', function () {

            var getFieldModelCtrl;

            given:
                nemoFormHandlerCtrl.getFieldNgModelCtrl.returns('foo');

            when:
                getFieldModelCtrl = $scope.getFieldNgModelCtrl();

            then:
                expect(getFieldModelCtrl).toBe('foo');
        });
    });

    describe('getFieldStyleClasses', function () {

        it('must return the proper style classes based on the touched & valid info provided by Nemo', function () {

            var fieldStyleClasses, fieldName = 'foo';

            given:
                nemoFormHandlerCtrl.isFieldTouched.withArgs(fieldName).returns(true);
                nemoFormHandlerCtrl.isFieldValid.withArgs(fieldName).returns(true);

            when:
                fieldStyleClasses = $scope.getFieldStyleClasses(fieldName);

            then:
                expect(fieldStyleClasses).toEqual({'ng-touched': true, 'ng-invalid': false});
        });
    });

    describe('getMessageType', function () {

        [
            {isInvalid: false,  isTouched: false,   hasHelp: false, expectedMessageType: undefined},
            {isInvalid: false,  isTouched: false,   hasHelp: true,  expectedMessageType: 'help'},
            {isInvalid: false,  isTouched: true,    hasHelp: false, expectedMessageType: undefined},
            {isInvalid: false,  isTouched: true,    hasHelp: true,  expectedMessageType: 'help'},
            {isInvalid: true,   isTouched: false,   hasHelp: false, expectedMessageType: undefined},
            {isInvalid: true,   isTouched: false,   hasHelp: true,  expectedMessageType: 'help'},
            {isInvalid: true,   isTouched: true,    hasHelp: false, expectedMessageType: 'error'},
            {isInvalid: true,   isTouched: true,    hasHelp: true,  expectedMessageType: 'error'}

        ].forEach(function (scenario) {

            it('must return ' + scenario.expectedMessageType +
            ' when the field is ' + (scenario.isInvalid ? 'invalid' : 'valid') +
            ' and ' + (scenario.isTouched ? 'touched' : 'not touched') +
            ' and ' + (scenario.hasHelp ? 'has' : 'doesn\'t have') + ' help', function () {

                var messageType, fieldName = 'foo';

                given:
                    nemoFormHandlerCtrl.isFieldValid.withArgs(fieldName).returns(!scenario.isInvalid);
                    nemoFormHandlerCtrl.isFieldTouched.withArgs(fieldName).returns(scenario.isTouched);
                    nemoFormHandlerCtrl.hasHelp.withArgs(fieldName).returns(scenario.hasHelp);

                when:
                    messageType = $scope.getMessageType(fieldName);

                then:
                    expect(messageType).toBe(scenario.expectedMessageType);
            });
        });
    });

    describe('isErrorMessageVisible / isHelpMessageVisible', function () {

        [
            {
                method: 'isErrorMessageVisible',
                scenarios: [
                    {messageType: 'error',  isFieldActive: true,    isIconVisible: true,    expectedMessageVisible: true},
                    {messageType: 'error',  isFieldActive: true,    isIconVisible: false,   expectedMessageVisible: true},
                    {messageType: 'error',  isFieldActive: false,   isIconVisible: true,    expectedMessageVisible: true},
                    {messageType: 'error',  isFieldActive: false,   isIconVisible: false,   expectedMessageVisible: false},
                    {messageType: 'help',   isFieldActive: true,    isIconVisible: true,    expectedMessageVisible: false},
                    {messageType: 'help',   isFieldActive: true,    isIconVisible: false,   expectedMessageVisible: false},
                    {messageType: 'help',   isFieldActive: false,   isIconVisible: true,    expectedMessageVisible: false},
                    {messageType: 'help',   isFieldActive: false,   isIconVisible: false,   expectedMessageVisible: false}
                ]
            }, {
            method: 'isHelpMessageVisible',
            scenarios: [
                {messageType: 'error',  isFieldActive: true,    isIconVisible: true,    expectedMessageVisible: false},
                {messageType: 'error',  isFieldActive: true,    isIconVisible: false,   expectedMessageVisible: false},
                {messageType: 'error',  isFieldActive: false,   isIconVisible: true,    expectedMessageVisible: false},
                {messageType: 'error',  isFieldActive: false,   isIconVisible: false,   expectedMessageVisible: false},
                {messageType: 'help',   isFieldActive: true,    isIconVisible: true,    expectedMessageVisible: true},
                {messageType: 'help',   isFieldActive: true,    isIconVisible: false,   expectedMessageVisible: true},
                {messageType: 'help',   isFieldActive: false,   isIconVisible: true,    expectedMessageVisible: true},
                {messageType: 'help',   isFieldActive: false,   isIconVisible: false,   expectedMessageVisible: false}
            ]
        }
        ].forEach(function (scenarioGroup) {

            scenarioGroup.scenarios.forEach(function (scenario) {

                it('the method ' + scenarioGroup.method +' must return message ' +
                (scenario.expectedMessageVisible ? 'is' : 'isn\'t') + ' visible' +
                ' when the message type is ' + scenario.messageType + ' and the field ' +
                (scenario.isFieldActive ? 'is' : 'isn\'t') + ' active' +
                ' and the icon ' + (scenario.isIconVisible ? 'is' : 'isn\'t') + ' visible', function () {

                    var messageVisible, fieldName = 'foo';

                    given:
                        sinon.stub($scope, 'getMessageType').withArgs(fieldName).returns(scenario.messageType);
                    nemoFormHandlerCtrl.isFieldActive.withArgs(fieldName).returns(scenario.isFieldActive);
                    setIconVisibility(scenario.isIconVisible, fieldName);

                    when:
                        messageVisible = $scope[scenarioGroup.method](fieldName);

                    then:
                        expect(messageVisible).toBe(scenario.expectedMessageVisible);
                });
            });
        });
    });

    describe('isHoveredAndNotActive', function () {

        [
            {isIconVisible: true,   isFieldActive: true,    expectedHoveredAndNotActive: false},
            {isIconVisible: true,   isFieldActive: false,   expectedHoveredAndNotActive: true},
            {isIconVisible: false,  isFieldActive: true,    expectedHoveredAndNotActive: false},
            {isIconVisible: false,  isFieldActive: false,   expectedHoveredAndNotActive: false}

        ].forEach(function (scenario) {

            it('must return ' + scenario.expectedHoveredAndNotActive + ' if the icon ' +
            (scenario.isIconVisible ? 'is' : 'isn\'t') + ' visible and the field ' +
            (scenario.isFieldActive ? 'is' : 'isn\'t') + ' active', function () {

                var isHoveredAndNotActive, fieldName = 'foo';

                given:
                    nemoFormHandlerCtrl.isFieldActive.withArgs(fieldName).returns(scenario.isFieldActive);
                setIconVisibility(scenario.isIconVisible, fieldName);

                when:
                    isHoveredAndNotActive = $scope.isHoveredAndNotActive(fieldName);

                then:
                    expect(isHoveredAndNotActive).toBe(scenario.expectedHoveredAndNotActive);
            });
        });
    });

    describe('submit', function () {

        beforeEach(inject(function (Home, Loading) {
            sinon.stub(Home, 'submitForm');
            sinon.stub(Loading, 'startLoading');
            sinon.stub(Loading, 'stopLoading');
        }));

        it('must set the focus on the first invalid field if the form' +
        ' is not valid from the frontend perspective,not submitting the form' +
        ' neither setting any loading state', inject(function (Home, Loading) {

            given:
                $scope.isFormValid.returns(false);

            when:
                $scope.submit();

            then:
                expect(nemoFormHandlerCtrl.giveFirstInvalidFieldFocus.calledOnce).toBe(true);

            and:
                expect(Loading.startLoading).not.toHaveBeenCalled();
                expect(Home.submitForm).not.toHaveBeenCalled();
        }));

        it('must submit the form after validating all the fields, setting the' +
        ' loading state whenever the form is valid and not setting the focus' +
        ' at any field', inject(function($q, Home, Loading) {

            given:
                $scope.isFormValid.returns(true);
                nemoFormHandlerCtrl.getFieldsValues.returns('foo');
                Home.submitForm.returns($q.when({}));

            when:
                $scope.submit();

            then:
                expect(nemoFormHandlerCtrl.validateFormAndSetDirtyTouched.calledOnce).toBe(true);
                expect(Loading.startLoading.calledOnce).toBe(true);
                expect(Home.submitForm.calledOnce).toBe(true);
                expect(Home.submitForm.calledWith('foo')).toBe(true);

            and:
                expect(nemoFormHandlerCtrl.giveFirstInvalidFieldFocus.calledOnce).toBe(false);
        }));

        it('must play the success song, stop the loading state, track validation and redirect to /thanks' +
        ' whenever the form is valid', inject(function ($rootScope, $state, $q, Home, Loading, Audio, Stats) {

            given:
                $scope.isFormValid.returns(true);
                Home.submitForm.returns($q.when({}));
                nemoFormHandlerCtrl.getValidationTracking.returns('foo');
                sinon.stub($state, 'go');
                sinon.stub(Audio, 'playSuccessSong');
                sinon.stub(Stats, 'submitValidationTracking');

            when:
                $scope.submit();
                $rootScope.$digest();

            then:
                expect($state.go).toHaveBeenCalledWith('thanks');
                expect(Loading.stopLoading).toHaveBeenCalled();
                expect(Audio.playSuccessSong).toHaveBeenCalled();
                expect(Stats.submitValidationTracking).toHaveBeenCalledWith('foo');
        }));

        it('must set the focus on the first invalid field, stop the loading state,' +
        ' and track validation whenever the form is not valid' +
        ' from the backend perspective', inject(function ($rootScope, $q, Home, Loading, Stats) {

            given:
                $scope.isFormValid.returns(true);
                nemoFormHandlerCtrl.getValidationTracking.returns('bar');
                Home.submitForm.returns($q.reject({
                    data: {
                        field: 'fooField',
                        message: 'bla message',
                        code: 'testCode'
                    }
                }));
                sinon.stub(Stats, 'submitValidationTracking');

            when:
                $scope.submit();
                $rootScope.$digest();

            then:
                expect(Loading.stopLoading).toHaveBeenCalled();
                expect(nemoFormHandlerCtrl.forceServerFieldInvalid).toHaveBeenCalledWith('fooField', 'bla message', '.testCode');
                expect(nemoFormHandlerCtrl.giveFirstInvalidFieldFocus).toHaveBeenCalled();
                expect(Stats.submitValidationTracking).toHaveBeenCalledWith('bar');
        }));
    });
});