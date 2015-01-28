/**
 *登录
 *
 */
angular.module('myApp.services')

    .service('LoginService', ['$http', '$q', 'baseUrl', 'loginUrl', function ($http, $q, baseUrl, loginUrl) {
        console.debug("constructing LoginService");
        var LoginService = {
            login: function (jsonStr) {
                var deferred;
                console.debug("login()");
                deferred = $q.defer();
                $http.get(baseUrl + loginUrl + jsonStr)
                    .then(function (data) {
                        console.info("Success to  execute function login  - status: " + data.status);
                        return deferred.resolve(data);
                    }, function (error) {
                        console.error("fail to  execute function login  - status: " + error.status);
                        return deferred.reject(error);
                    });
                return deferred.promise;
            }
        };
        return LoginService;
    }]);
