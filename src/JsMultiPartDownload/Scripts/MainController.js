(function () {
    "use strict";

    let mainController = function ($scope, $http) {

        $scope.download = function () {
            console.log('todo');
        }

    };

    angular
        .module("jsmultipartdownload")
        .controller("MainController", ["$scope", "$http", mainController]);

}());