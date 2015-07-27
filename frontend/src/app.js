var app = angular.module('app', ['nemo', 'ui.router', 'templates-main']);

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
                pageTitle: 'Welcome to Ricardomallols.com homepage!'
            });

        $urlRouterProvider.otherwise("/");

        inputProvider

            .input('captchamario', {
                template: '<iframe src="vendor/fullScreenMario/source/index.html"/>',
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

            .validation('levelcomplete', {
                validateFn: function (value, validationRule) {
                   return value && value.levelComplete === validationRule.value;
               }
            });
    }]);

app.run(['$rootScope', 'browser', function ($rootScope, browser) {
    $rootScope.userAgent = browser.getUA();
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = toState.pageTitle + ' | menzit';
    });
}]);