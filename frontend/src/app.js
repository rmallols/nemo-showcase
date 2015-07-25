var app = angular.module('app', ['ui.router', 'templates-main']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {

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
    }]);

app.run(['$rootScope', 'browser', function ($rootScope, browser) {
    $rootScope.userAgent = browser.getUA();
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = toState.pageTitle + ' | menzit';
    });
}]);