app.directive('homeFormHandler', [function () {
    return {
        require: '?nemoFormHandler',
        controller: 'HomeFormHandlerCtrl',
        link: function (scope, element, attrs, formHandlerCtrl) {
            scope.setup(formHandlerCtrl);
        }
    };
}]);