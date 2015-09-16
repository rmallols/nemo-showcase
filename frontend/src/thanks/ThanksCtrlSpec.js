describe('', function () {

    beforeEach(module('app'));

    it('must redirect to the credits state after the specified delay' +
    'in order to let the robot to finish his dance', inject(function ($state, $timeout) {

        var redirectTimeout = 16000;

        given:
            sinon.stub($state, 'go');

        when:
            compileController('ThanksCtrl');
            $timeout.flush(redirectTimeout - 1);

        then:
            expect($state.go).not.toHaveBeenCalled();

        when:
            $timeout.flush(redirectTimeout);

        then:
            expect($state.go).toHaveBeenCalledWith('credits');
    }));
});