app.service('Loading', [function () {

    var subscribedComponent = {};

    this.subscribe = function (component) {
        subscribedComponent = component;
    };

    this.startLoading = function () {
        (subscribedComponent.startLoading || angular.noop)();
    };

    this.stopLoading = function () {
        (subscribedComponent.stopLoading || angular.noop)();
    };
}]);