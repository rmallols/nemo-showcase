describe('loading directive', function () {

    beforeEach(module('app'));

    it('must call the subscribe method of the Loading service when' +
    ' the directive is declared', inject(function (Loading) {

        given:
            sinon.stub(Loading, 'subscribe');

        when:
            compileDirective('<loading></loading>');

        then:
            expect(Loading.subscribe.calledOnce).toBe(true);
    }));
});