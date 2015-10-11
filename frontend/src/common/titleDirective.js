app.directive('title', ['$rootScope', function ($rootScope) {
    return {
        link: function (scope) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                scope.pageTitle = toState.pageTitle + ' | Nemo shocase';
            });
        }
    };
}]);