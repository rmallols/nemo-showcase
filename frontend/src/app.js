var app = angular.module('app', ['nemo', 'ui.router', 'templates-main']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'nemoInputDirectiveCreatorProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, inputProvider) {

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
                template: '<div>' +
                            '<iframe src="vendor/fullScreenMario/source/index.html" style="border: 1px solid blue; height: 460px;"/>' +
                        '</div>',
                linkFn: function (scope, element, attrs, controllers) {
                    function handlingMsg(e) {
                        console.log("***works from the parent", e.data);
                    }
                    addEventListener("message",handlingMsg, true);
                }
            })
    }]);

app.run(['$rootScope', 'browser', function ($rootScope, browser) {
    $rootScope.userAgent = browser.getUA();
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = toState.pageTitle + ' | menzit';
    });
}]);