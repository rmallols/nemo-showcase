var app = angular.module('app', ['nemo', 'ui.router', 'templates-main', 'n3-line-chart']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'nemoInputDirectiveCreatorProvider', 'nemoValidationDirectiveCreatorProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, inputProvider, validationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: "home.html",
                controller: 'HomeCtrl',
                pageTitle: 'H!'
            })

            .state('stats', {
                url: '/stats',
                templateUrl: "stats.html",
                controller: 'StatsCtrl',
                pageTitle: 'S!'
            });

        $urlRouterProvider.otherwise("/");

        inputProvider

            .input('captchaMario', {
                template: '<iframe src="vendor/fullScreenMario/Source/index.html"/>',
                linkFn: function (scope, element, attrs, controllers) {
                    var formHandlerCtrl = controllers[1];
                    addEventListener("message", function (e) {
                        console.log('hello message received...', e.data);
                        formHandlerCtrl.setFieldValue('captcha', { levelComplete: e.data.event === 'levelComplete' });
                        formHandlerCtrl.setFieldDirtyTouched('captcha');
                        scope.$apply();
                    }, true);
                }
            });

        validationProvider

            .validation('levelComplete', {
                validateFn: function (value, validationRule) {
                   return value && value.levelComplete === validationRule.value;
               }
            });
    }]);

app.run(['$rootScope', 'browser', function ($rootScope, browser) {
    $rootScope.userAgent = browser.getUA();
}]);