describe('LoadingService', function () {


    beforeEach(function () {
        module('app');
        sinon.stub(angular, 'noop');
    });

    afterEach(function () {
        angular.noop.restore();
    });

    describe('startLoading', function () {

        it('must call the startLoading method of the register component' +
        ' when the startLoading method of the Loading service is called', inject(function(Loading) {

            var component;

            given:
                component = {
                    startLoading: sinon.stub()
                };

            and:
                Loading.subscribe(component);

            when:
                Loading.startLoading();

            then:
                expect(component.startLoading.calledOnce).toBe(true);
        }));

        it('must call the angular.noop method if no component is registered' +
        ' when the startLoading method of the Loading service is called', inject(function(Loading) {

            when:
                Loading.startLoading();

            then:
                expect(angular.noop.calledOnce).toBe(true);
        }));
    });

    describe('stopLoading', function () {

        it('must call the stopLoading method of the register component' +
        ' when the stopLoading method of the Loading service is called', inject(function(Loading) {

            var component;

            given:
                component = {
                    stopLoading: sinon.stub()
                };

            and:
                Loading.subscribe(component);

            when:
                Loading.stopLoading();

            then:
                expect(component.stopLoading.calledOnce).toBe(true);
        }));

        it('must call the angular.noop method if no component is registered' +
        ' when the stopLoading method of the Loading service is called', inject(function(Loading) {

            when:
                Loading.stopLoading();

            then:
                expect(angular.noop.calledOnce).toBe(true);
        }));
    });
});