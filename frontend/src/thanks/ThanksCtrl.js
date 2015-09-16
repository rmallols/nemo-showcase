app.controller('ThanksCtrl', ['$timeout', '$state', function ($timeout, $state) {
    var redirectTimeout = 1600;
    $timeout(function () {
        $state.go('credits');
    }, redirectTimeout);
}]);