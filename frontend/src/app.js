var app = angular.module('app', ['nemo', 'ui.router', 'templates-main', 'n3-line-chart', 'captcha-mario']);

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
                template:   '<div>' +
                                '<captcha-mario on-dead="onDead()" on-level-complete="onLevelComplete()"></captcha-mario>' +
                            '</div>',
                linkFn: function (scope, element, attrs, controllers) {

                    var formHandlerCtrl = controllers[1];

                    function onEventReceived(eventKey) {
                        formHandlerCtrl.setFieldValue('captcha', {
                            levelComplete: eventKey === 'levelComplete'
                        });
                        formHandlerCtrl.setFieldDirtyTouched('captcha');
                        scope.$apply();
                    }

                    scope.onDead = function () {
                        onEventReceived('dead');
                    };

                    scope.onLevelComplete = function () {
                        onEventReceived('levelComplete');
                    };
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