app.controller('StatsCtrl', ['$scope', 'Stats', function ($scope, Stats) {

    Stats.getValidationTracking().then(function (response) {
        var stackSeries = Stats.getStackSeries(response.data);
        $scope.data = Stats.getNormalisedData(stackSeries, response.data);
        $scope.options = Stats.getNormalisedOptions(stackSeries, $scope.data);
        $scope.documentWidth = document.getElementById('view').offsetWidth - 40;
    });
}]);