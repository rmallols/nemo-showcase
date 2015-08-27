app.directive('loading', ['Loading', function (Loading) {
    return {
        template:   '<div class="overlay" ng-if="loading">' +
                        '<div class="overlay-content">' +
                            '<div class="overlay-content-loader"></div>' +
                        '</div>' +
                    '</div>',
        link: function (scope) {

            function startLoading() {
                scope.loading = true;
            }

            function stopLoading() {
                scope.loading = false;
            }

            Loading.subscribe({
                startLoading: startLoading,
                stopLoading: stopLoading
            });
        }
    }
}]);