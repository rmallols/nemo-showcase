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

            var scope, fieldInterfaceFns;

            given:
                scope = $rootScope.$new();
                sinon.stub(scope, '$apply');
                fieldInterfaceFns = {
                    setValue: sinon.stub(),
                    setFilthy: sinon.stub()
                };

            when:
                captchaMarioProvider.linkFn(scope, {}, {}, fieldInterfaceFns);

            and:
                scope[scenario.method]();

            then:
                expect(fieldInterfaceFns.setValue).toHaveBeenCalledWith(scenario.expectedLevelComplete);
                expect(fieldInterfaceFns.setFilthy).toHaveBeenCalled();
        }));
    });
});