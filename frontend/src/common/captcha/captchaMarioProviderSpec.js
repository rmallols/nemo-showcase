describe('captchaMario', function () {

    var captchaMarioProvider;

    beforeEach(module('app', function (_captchaMarioProvider_) {
        captchaMarioProvider = _captchaMarioProvider_;
    }));

    [
        { method: 'onDead', expectedLevelComplete: false },
        { method: 'onLevelComplete', expectedLevelComplete: true }

    ].forEach(function (scenario) {

        it('must set the value of the field to levelComplete: ' + scenario.expectedLevelComplete + ',' +
        ' marking it as $dirty and $touched when the ' + scenario.method + ' is invoked', inject(function ($rootScope) {

            var scope, fieldInterfaceCtrl;

            given:
                scope = $rootScope.$new();
                sinon.stub(scope, '$apply');
                fieldInterfaceCtrl = {
                    setValue: sinon.stub(),
                    setFilthy: sinon.stub()
                };

            when:
                captchaMarioProvider.link(scope, {}, {}, fieldInterfaceCtrl);

            and:
                scope[scenario.method]();

            then:
                expect(fieldInterfaceCtrl.setValue).toHaveBeenCalledWith(scenario.expectedLevelComplete);
                expect(fieldInterfaceCtrl.setFilthy).toHaveBeenCalled();
        }));
    });
});