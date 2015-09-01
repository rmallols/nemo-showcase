describe('HomeCtrl', function () {

    var $scope = {};

    beforeEach(module('app'));

    it('must call the getFormSetup method of the Home service, saving the retrieved' +
    ' fields into the scope afterwards', inject(function ($rootScope, $q, Home) {

        given:
            sinon.stub(Home, 'getFormSetup').returns($q.when({ data: 'foo'}));

        when:
            compileController('HomeCtrl', {$scope: $scope});
            $rootScope.$digest();

        then:
            expect(Home.getFormSetup).toHaveBeenCalled();
            expect($scope.fields).toBe('foo');
    }));
});
