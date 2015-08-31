describe('HomeCtrlSpec', function () {

    var $scope = {};

    beforeEach(module('app'));

    it('a', inject(function ($rootScope, $q, Home) {

        given:
            sinon.stub(Home, 'getFormSetup').returns($q.when({ data: 'foo'}));

        when:
            compileController('HomeCtrl', {$scope: $scope});
            $rootScope.$digest();

        then:
            expect(Home.getFormSetup.calledOnce).toBe(true);
            expect($scope.fields).toBe('foo');
    }));
});
