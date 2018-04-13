# AngularJS Download Multiple Files from a Single multipart/mixed Response from WebAPI

This repository contains an example of how to use AngularJS to make a WebAPI request that returns a single multipart/mixed response  enabling the user to download multiple files.  The user can either be prompted by the native download or you can provide a custom experience with a blob URL.

The sample makes use of FileSaver.js.  Once the response is received from the WebAPI as an array buffer, a little bit of custom code is used to break the multipart response into its respective parts.  The download service returns a list of files which the developer can use to either saveAs (using FileSaver) or create links enabling the user to click to download.  The download service can handle a single response or a multipart response--either way, it returns an array of file json object containing the information and blob data.

