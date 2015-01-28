/**
 * 个人中心service
 * 方法：（获取用户信息）
 */
angular.module('myApp.services')
    .service('PersonalCenterService', ['$http', '$q', 'baseUrl', 'getUserUrl',
        function ($http, $q, baseUrl, getUserUrl) {
            console.debug("constructing PersonalCenterService");

            var PersonalCenterService = {
                getUserInfo: function (header) {
                    var deferred;
                    console.debug("PersonalCenterService()");
                    deferred = $q.defer();

                    $http({
                        method: 'get',
                        url: baseUrl + getUserUrl,
                        headers: header
                    }).then(function (data) {
                        console.info("Successfully  execute function getUserInfo  - status: " + data.status);
                        return deferred.resolve(data);
                    }, function (data, status) {
                        console.error("Failed to execute function getUserInfo - status: " + status);
                        return deferred.reject(data);
                    });
                    return deferred.promise;
                }
            };

            return PersonalCenterService;
        }]);