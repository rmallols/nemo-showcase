console.log('we have to test the service as well');
app.service('Home', ['$http', function ($http) {

    this.getFormSetup = function () {
        return $http.get('/rest/formSetup');
    };

    this.submitForm = function (formData) {
        return $http.post('/rest/submitForm', formData);
    };
}]);