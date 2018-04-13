(function () {
    "use strict";

    let app = angular.module("jsmultipartdownload", []);

    app.config(["$compileProvider", function ($compileProvider) {
        // have to add blob or angular will mark the link as unsafe
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
    }]);

})();