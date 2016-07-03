'use strict';

/* Controllers */

var clockControllers = angular.module('clockControllers', []);

clockControllers.controller('timeController', ['$scope', '$interval', function ($scope, $interval) {
    $scope.initClocks = function () {
        console.log('init');
        $scope.time = new Date();
        $scope.zones = [];
        $scope.gmt = 0;
        $scope.name = '';
        $scope.isError = false;
    };

    $scope.getTime = function () {
        $scope.time = new Date();
    };

    $interval($scope.getTime, 1000);

    $scope.addTZ = function (id) {
        var newzone = {};
        var input = angular.element(id);
        newzone.gmt = parseInt($scope.gmt);
        if (newzone.gmt < -12 || newzone.gmt > 12 || newzone.gmt != newzone.gmt) {
            input.val('');
            input.attr('placeholder', "value from -12 to 12");
            input.addClass('holdcol');
        } else {
            newzone.name = $scope.name;
            if (!$scope.isError)
                $scope.zones.push(newzone);
        }
    };

    function isInputEmpty(value) {
        return $.trim(value).length == 0
    }

    $scope.inputChange = function (id) {
        var input = angular.element(id);
        if (isInputEmpty($scope.name)) {
            input.val('');
            input.attr('placeholder', "Name can't be empty");
            input.addClass('holdcol');
            $scope.isError = true;
        }
        else
            $scope.isError = false;
    };

    $scope.cancelTZ = function () {
        $scope.gmt = '';
        $scope.name = '';
    };

    $scope.getLocTime = function (loc_gmt) {
        var h = loc_gmt + 12;
        return ($scope.time.setUTCHours(h));
    }
}]);