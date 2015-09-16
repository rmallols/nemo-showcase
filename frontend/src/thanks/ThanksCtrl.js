app.controller('ThanksCtrl', ['$state', '$timeout', function ($state, $timeout) {
    var redirectTimeout = 16000;
    $timeout(function () {
        $state.go('credits');
    }, redirectTimeout);
}]);