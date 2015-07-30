app.controller('StatsCtrl', ['$scope', function ($scope) {

    $scope.data = [
        {
            x: 0,
            label: 'firstName',
            val_0: 0.993,
            val_1: 3.894,
            val_2: 8.47
        },
        {
            x: 1,
            label: 'lastName',
            val_0: 1.947,
            val_1: 7.174,
            val_2: 13.981
        },
        {
            x: 2,
            label: 'username',
            val_0: 2.823,
            val_1: 9.32,
            val_2: 14.608
        },
        {
            x: 3,
            label: 'password',
            val_0: 3.587,
            val_1: 9.996,
            val_2: 10.132
        },
        {
            x: 4,
            label: 'confirmPassword',
            val_0: 4.207,
            val_1: 9.093,
            val_2: 2.117
        },
        {
            x: 5,
            label: 'terms',
            val_0: 4.66,
            val_1: 6.755,
            val_2: 6.638
        }
    ];

    $scope.options = {
        axes: {
            x: {
                key: "x",
                //ticksRotate: 0,
                ticksFormatter: function(d, i) {
                    return $scope.data[i-1] ? $scope.data[i-1].label : "";
                }
            }
        },
        stacks: [
            {
                axis: "y",
                series: [
                    "id_0",
                    "id_1",
                    "id_2"
                ]
            }
        ],
        lineMode: "cardinal",
        columnsHGap: 50,
        tooltip: {
            mode: 'scrubber',
            formatter: function(x, y, series) {
                return series.label + ': ' + y;
            }
        },
        series: [
        {
            id: "id_0",
            y: "val_0",
            label: "required",
            type: "column",
            color: "#1f77b4"
        },
        {
            id: "id_1",
            y: "val_1",
            label: "min-length",
            type: "column",
            color: "#ff7f0e"
        },
        {
            id: "id_2",
            y: "val_2",
            label: "max-length",
            type: "column",
            color: "#d62728"
        }
    ]};
}]);