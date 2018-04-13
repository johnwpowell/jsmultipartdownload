(function () {
    "use strict";

    let mainController = function ($scope, $window, downloadService) {

        $scope.downloadedFiles = [];

        $scope.download = function (multiple) {

            $scope.downloadedFiles = [];

            (multiple ? downloadService.download() : downloadService.downloadSingle())
                .then(function (files) {

                // option 1, prompt to save
                for (var i = 0; i < files.length; i++) {
                    let file = files[i];
                    $window.saveAs(file.blob, file.filename);
                }

                // option 2, blob links
                for (var i = 0; i < files.length; i++) {
                    let file = files[i];

                    $scope.downloadedFiles.push({
                        filename: file.filename,
                        url: $window.URL.createObjectURL(file.blob)
                    });
                }

            });
        }
    };

    angular
        .module("jsmultipartdownload")
        .controller("MainController", ["$scope", "$window", "DownloadService", mainController]);

}());