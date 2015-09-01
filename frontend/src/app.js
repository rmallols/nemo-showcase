var app = angular.module('app', ['nemo', 'ui.router', 'templates-main', 'n3-line-chart', 'captcha-mario']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'nemoInputDirectiveCreatorProvider',
    'nemoValidationDirectiveCreatorProvider', 'captchaInputProvider', 'levelCompleteProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, inputProvider, validationProvider,
              captchaInputProvider, levelCompleteProvider) {

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

            .state('thanks', {
                url: '/thanks',
                templateUrl: "thanks.html",
                controller: 'ThanksCtrl',
                pageTitle: 'T!'
            })

            .state('stats', {
                url: '/stats',
                templateUrl: "stats.html",
                controller: 'StatsCtrl',
                pageTitle: 'S!'
            });

        $urlRouterProvider.otherwise("/");

        inputProvider
            .input('captchaMario', captchaInputProvider);

        validationProvider
            .validation('levelComplete', levelCompleteProvider);
    }]);

app.run(['$rootScope', 'Browser', function ($rootScope, Browser) {
    $rootScope.userAgent = Browser.getUA();
}]);