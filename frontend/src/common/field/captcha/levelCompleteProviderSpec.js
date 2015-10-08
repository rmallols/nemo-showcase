describe('levelComplete', function () {

    var levelCompleteProvider, isValid;

    beforeEach(module('app', function (_levelCompleteProvider_) {
        levelCompleteProvider = _levelCompleteProvider_;
    }));

    [
        { fieldValue: false,    validationRuleValue: false, expectedValidity: true },
        { fieldValue: false,    validationRuleValue: true,  expectedValidity: false },
        { fieldValue: true,     validationRuleValue: false, expectedValidity: false },
        { fieldValue: true,     validationRuleValue: true,  expectedValidity: true }

    ].forEach(function (scenario) {

        it('must set the validity to ' + scenario.expectedValidity + ' if the field value is ' + scenario.fieldValue +
        ' and the validation rule value is ' + scenario.validationRuleValue, inject(function () {

            var fieldValue, validationRule;

            given:
                fieldValue = scenario.fieldValue;
                validationRule = {
                    value: scenario.validationRuleValue
                };

            when:
                isValid = levelCompleteProvider.validate(fieldValue, validationRule);

            then:
                expect(isValid).toBe(scenario.expectedValidity);
        }));
    });

});