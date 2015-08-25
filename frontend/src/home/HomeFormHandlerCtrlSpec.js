describe('HomeFormHandlerCtrlSpec', function () {

    beforeEach(function () {
        module('app');
    });

    it('foo', inject(function () {

        var scope = {};
        compileController('HomeFormHandlerCtrl', { $scope: scope })
        //console.log('the sinon is', sinon);
       expect(true).toBe(true);
    }));
});