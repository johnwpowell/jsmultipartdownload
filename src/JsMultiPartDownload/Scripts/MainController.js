(function () {
    "use strict";

    let mainController = function ($scope, $window, downloadService) {

        $scope.downloadedFiles = [];

        $scope.download = function (multiple) {

            var downloadPromise = multiple ? downloadService.download() : downloadService.downloadSingle();

            downloadPromise.then(function (files) {

                // option 1, prompt the user to save
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    saveAs(file.blob, file.filename);
                }

                // option 2, links for user to click
                $scope.downloadedFiles = [];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

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