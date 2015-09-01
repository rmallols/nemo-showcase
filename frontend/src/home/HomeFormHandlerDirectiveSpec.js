describe('home-form-handler', function () {

    beforeEach(module('app'));

    it('must call the setup method of the scope,' +
    ' passing the nemo form handler ctrl as a argument' +
    ' PLEASE NOTE that, becasue of the complexity of the setup of this test' +
    ' (we have to stup a scope / controller before compiling the directive,' +
    ' but at that state of the lifecycle those components doesn\'t exist yet!' +
    ' we have decided to go further and (partially) test the controller attached' +
    ' to the directive, which obviously is not ideal but at least is better' +
    ' than not having unit test coverage at all for this feature', function () {

        var template, compiledEl, nemoFormHandlerCtrl, fieldStyleClasses;

        given:
            template = '<form nemo-form-handler home-form-handler></form>';

        when:
            compiledEl = compileDirective(template);
            nemoFormHandlerCtrl = compiledEl.controller('nemoFormHandler');

        and:
            sinon.stub(nemoFormHandlerCtrl, 'isFieldTouched').returns(true);
            sinon.stub(nemoFormHandlerCtrl, 'isFieldValid').returns(false);

        and:
            fieldStyleClasses = compiledEl.scope().getFieldStyleClasses('testField');

        then:
            expect(fieldStyleClasses['ng-touched']).toBe(true);
            expect(fieldStyleClasses['ng-invalid']).toBe(true);
    });
});