(function () {
    "use strict";

    let downloadService = function ($http) {
        
        let download = function () {
            return $http(
                {
                    method: "GET",
                    url: "api/download",
                    responseType: "arraybuffer"
                })
                .then(function (result) {
                    var files = getFiles(result);
                    return files;
                });
        };

        let downloadSingle = function () {
            return $http(
                {
                    method: "GET",
                    url: "api/download/1",
                    responseType: "arraybuffer"
                })
                .then(function (result) {
                    var files = getFiles(result);
                    return files;
                });
        };

        let getFiles = function (result) {

            var contentTypeHeaderRegEx = new RegExp('^([^;\\r\\n]*)');
            var contentTypeRegEx = new RegExp('content-type[^;:\\r\\n]*:\\W*[\\\'"]?([^\\\'"\\r\\n;]*)[\\\'"]?', 'i');
            var filenameRegEx = new RegExp('filename[^;=\\r\\n]*=[\\\'"]?([^\\\'"\\r\\n;]*)[\\\'"]?', 'i');

            // get the content type header and determine if we are working with multi-part
            var contentTypeHeader = result.headers()['content-type'];
            var contentType = contentTypeHeaderRegEx.exec(contentTypeHeader)[0];
            if (contentType.toLowerCase() === 'multipart/mixed') {

                var byteArray = new Uint8Array(result.data);

                // get the boundary token
                var boundaryRegEx = new RegExp('boundary[^;=\\r\\n]*=[\\\'"]?([^\\\'"\\r\\n;]*)[\\\'"]?', 'i');
                var boundary = '--' + boundaryRegEx.exec(contentTypeHeader)[1];

                // boundary token as bytes so we don't have to keep converting them
                var boundaryToken = [];
                for (var x = 0; x < boundary.length; x++) {
                    boundaryToken.push(boundary.charCodeAt(x));
                }

                var newlineToken = '\n'.charCodeAt(0);

                var partHeader = '';
                var headerParsed = false;
                var newlineCount = 0;
                var boundaryIndex = 0;
                var firstBoundary = true;

                var parts = [];
                var currentPart = {};

                for (var i = 0; i < byteArray.byteLength; i++) {

                    var currentChar = byteArray[i];
                    var boundaryChar = boundaryToken[boundaryIndex];

                    if (!firstBoundary && !headerParsed) {
                        partHeader += String.fromCharCode(currentChar);
                    }

                    // did we start matching a boundary?
                    if (currentChar === boundaryChar) {

                        boundaryIndex++;

                        // did we fully match a boundary?
                        if (boundaryIndex === boundaryToken.length) {

                            // reset the boundary index
                            boundaryIndex = 0;

                            // if not the first boundary, add the part
                            if (!firstBoundary) {

                                // end position of the part is before the boundary
                                currentPart.endPosition = i - boundaryToken.length - 1;
                                parts.push(currentPart);

                                // create the next part
                                currentPart = {};
                            }

                            // reset for next part
                            partHeader = '';
                            headerParsed = false;
                            newlineCount = 0;

                            // flag first boundary found
                            firstBoundary = false;
                        }

                    } else {

                        // if the header has been parsed, get information
                        if (!headerParsed) {

                            // determine if newline
                            if (currentChar === newlineToken) {
                                newlineCount++;
                            }

                            // content starts on line 4, parse info from header
                            if (newlineCount === 4) {

                                // get the file name
                                currentPart.filename = filenameRegEx.exec(partHeader)[1];

                                // get the content type
                                currentPart.contentType = contentTypeRegEx.exec(partHeader)[1];

                                // flag the header as being parsed
                                headerParsed = true;

                                // set the part start position
                                currentPart.startPosition = i + 1;
                            }
                        }

                        // not matching a boundary, reset
                        boundaryIndex = 0;
                    }
                }

                // now that we have info about parts, get the blobs
                for (var p = 0; p < parts.length; p++) {
                    var part = parts[p];

                    var bytes = byteArray.slice(part.startPosition, part.endPosition);
                    part.blob = new Blob([bytes], { type: part.contentType });

                    // remove unused properties
                    delete part.startPosition;
                    delete part.endPosition;
                }

                return parts;

            } else {

                // get the content disposition which contains the file name
                var contentDisp = result.headers()['content-disposition'];

                return [
                    {
                        contentType: contentType,
                        filename: filenameRegEx.exec(contentDisp)[1],
                        blob: new Blob([result.data], { type: contentType })
                    }];
            }
        };

        return {
            download: download,
            downloadSingle: downloadSingle
        };

    };

    angular
        .module("jsmultipartdownload")
        .factory("DownloadService", ["$http", downloadService]);

})();