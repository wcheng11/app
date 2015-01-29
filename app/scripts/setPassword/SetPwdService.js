/**
 * 忘记密码service
 * 方法：（获取验证码、忘记密码）
 */
angular.module('myApp.services')
    .service('SetPwdService', ['$http', '$q', 'baseUrl', 'setPwdUrl',
        function ($http, $q, baseUrl, setPwdUrl) {
            console.debug("constructing SetPwdService");

            var SetPwdService = {


                setPwd: function (jsonStr,header) {
                    var deferred;
                    console.debug("SetPwdService()");
                    deferred = $q.defer();
                    $http({
                        method: 'put',
                        url: baseUrl + setPwdUrl + jsonStr,
                        headers: header
                    }).then(function (data) {
                        console.info("Successfully  execute function setPwd  - status: " + data.status);
                        return deferred.resolve(data);
                    }, function (data, status) {
                        console.error("Failed to execute function setPwd - status: " + status);
                        return deferred.reject(data);
                    });
                    return deferred.promise;
                }
            };

            return SetPwdService;
        }]);