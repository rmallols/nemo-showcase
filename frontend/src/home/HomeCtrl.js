app.controller('HomeCtrl', ['$scope', '$http', 'Home', function ($scope, $http, Home) {
    Home.getFormSetup().then(function (response) {
        $scope.fields = response.data;
    });
}]);