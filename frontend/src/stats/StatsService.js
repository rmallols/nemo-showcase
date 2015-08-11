app.service('Stats', ['$http', function ($http) {

    var self = this;

    this.submitvalidationTracking = function (validationTracking) {
        $http.post('/rest/validation/track', validationTracking);
    };

    this.getValidationTracking = function () {
        return $http.get('/rest/validation/track');
    };

    this.getNormalisedData = function (stackSeries, data) {
        var normalisedData = this.getNormalisedDataWithExistingValues(data);
        normalisedData = this.getNormalisedDataWithDefaultValues(stackSeries, normalisedData);
        return normalisedData;
    };

    this.getNormalisedOptions = function (stackSeries, normalisedData) {
        var normalisedSeries = this.getNormalisedSeries(stackSeries),
            normalisedStackSeries = this.getNormalisedStackSeries(stackSeries);
        return this.getOptions(normalisedSeries, normalisedStackSeries, normalisedData);
    };

    this.getOptions = function (normalisedSeries, normalisedStackSeries, normalisedData) {
        return {
            axes: this.getAxesOptions(normalisedData),
            stacks: this.getStacksOptions(normalisedStackSeries),
            margin: this.getMarginOptions(),
            tooltip: this.getTooltipOptions(),
            lineMode: "cardinal",
            columnsHGap: 5,
            series: normalisedSeries
        }
    };

    this.getAxesOptions = function (normalisedData) {
        return {
            x: {
                key: "x",
                ticksRotate: -45,
                ticksFormatter: function (d, i) {
                    return normalisedData[i - 1] ? normalisedData[i - 1].label : "";
                }
            }
        };
    };

    this.getStacksOptions = function (normalisedStackSeries) {
        return [{
            axis: "y",
            series: normalisedStackSeries
        }]
    };

    this.getMarginOptions = function () {
        return {
            top: 25,
            right: 0,
            bottom: 125,
            left: 30
        };
    };

    this.getTooltipOptions = function () {
        return {
            mode: 'scrubber',
            formatter: function (x, y, series) {
                return series.label + ': ' + y;
            }
        };
    };

    this.getStackSeries = function (data) {
        var stackSeries = {};
        angular.forEach(data, function (validationRuleIds, fieldName) {
            angular.forEach(validationRuleIds, function (validationRuleCounter, validationRuleId) {
                stackSeries[validationRuleId] = fieldName;
            });
        });
        return stackSeries;
    };

    this.getNormalisedStackSeries = function (stackSeries) {
        var normalisedStackSeries = [];
        angular.forEach(stackSeries, function (stackSeriesValue, stackSeriesId) {
            normalisedStackSeries.push(stackSeriesId);
        });
        return normalisedStackSeries;
    };

    this.getNormalisedSeries = function (stackSeries) {
        var normalisedSeries = [],
            index = 0;
        angular.forEach(stackSeries, function (stackSeriesValue, stackSeriesId) {
            normalisedSeries.push(self.getNormalisedSeriesInstance(stackSeriesId, index));
            index++;
        });
        return normalisedSeries;
    };

    this.getNormalisedSeriesInstance = function (stackSeriesId, index) {
        return {
            id: stackSeriesId,
            y: stackSeriesId,
            label: stackSeriesId,
            type: "column",
            color: self.getColor(index)
        };
    };

    this.getNormalisedDataWithExistingValues = function (data) {
        var normalisedData = [], index = 0;
        angular.forEach(data, function (validationRuleIds, fieldName) {
            var normalisedDataInstance =  self.getNormalisedDataInstance(fieldName, index, validationRuleIds);
            normalisedData.push(normalisedDataInstance);
            index++;
        });
        return normalisedData;
    };

    this.getNormalisedDataInstance = function (fieldName, index, validationRuleIds) {
        var normalisedDataInstance = {
            x: index,
            label: fieldName
        };
        angular.forEach(validationRuleIds, function (validationRuleCounter, validationRuleId) {
            normalisedDataInstance[validationRuleId] = validationRuleCounter;
        });
        return normalisedDataInstance;
    };

    this.getNormalisedDataWithDefaultValues = function (stackSeries, normalisedData) {
        angular.forEach(stackSeries, function (stackSeriesValue, stackSeriesId) {
            angular.forEach(normalisedData, function (normalisedDataInstance) {
                if (!normalisedDataInstance[stackSeriesId]) {
                    normalisedDataInstance[stackSeriesId] = 0;
                }
            });
        });
        return normalisedData;
    };

    this.getColor = function (index) {
        var colorPalette = ['ff66cc', '66ccff', 'dddd00', '33cc33', 'ff9900', 'cc66ff', 'ff0000'];
        return (index < colorPalette.length) ? '#' + colorPalette[index] : this.getRandomColor();
    };

    this.getRandomColor = function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
}]);