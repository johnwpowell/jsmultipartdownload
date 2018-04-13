(function () {
    "use strict";

    let gitHubService = function ($http) {

        let getUser = function (username) {
            let url = ("https://api.github.com/users/" + username);

            return $http.get(url)
                .then((response) => {
                    return response.data;
                });
        };

        let getRepos = function (repos_url) {
            return $http.get(repos_url)
                .then((response) => {
                    return response.data;
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };

    };

    angular
        .module("githubViewer")
        .factory("GitHubService", ["$http", gitHubService]);

})();