describe('Home', function () {

    beforeEach(module('app'));

    describe('getFormSetup', function () {

        it('must get the form setup from the backend',
        inject(function ($rootScope, $http, $q, Home) {

            var formSetupResponse = null;

            given:
                sinon.stub($http, 'get').returns($q.when('foo'));

            when:
                Home.getFormSetup().then(function (response) {
                    formSetupResponse = response;
                });
                $rootScope.$digest();

            then:
                expect($http.get.calledOnce).toBe(true);
                expect($http.get.calledWith('/rest/formSetup')).toBe(true);
                expect(formSetupResponse).toBe('foo');
        }));
    });

    describe('submitForm', function () {

        it('must submit the form data to the backend',
        inject(function ($rootScope, $http, $q, Home) {

            var submitFormResponse = null;

            given:
                sinon.stub($http, 'post').returns($q.when('bla'));

            when:
                Home.submitForm().then(function (response) {
                    submitFormResponse = response;
                });
                $rootScope.$digest();

            then:
                expect($http.post.calledOnce).toBe(true);
                expect($http.post.calledWith('/rest/submitForm')).toBe(true);
                expect(submitFormResponse).toBe('bla');
        }));
    });
});