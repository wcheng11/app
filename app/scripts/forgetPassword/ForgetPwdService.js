/**
 * 忘记密码service
 * 方法：（获取验证码、忘记密码）
 */
angular.module('myApp.services')
    .service('ForgetPwdService', ['$http', '$q', 'baseUrl', 'forgetUrl', 'verifyCodeUrl',
        function ($http, $q, baseUrl, forgetUrl, verifyCodeUrl) {
            console.debug("constructing ForgetPwdService");

            var ForgetPwdService = {

                forgetPwd: function (jsonStr, mobileId) {
                    var deferred;
                    console.debug("ForgetPwdService()");
                    deferred = $q.defer();
                    $http.get(baseUrl + forgetUrl + mobileId + jsonStr).then(function (data) {
                        console.info("Successfully  execute function forgetPwd  - status: " + data.status);
                        return deferred.resolve(data);
                    }, function (data, status) {
                        console.error("Failed to execute function forgetPwd - status: " + status);
                        return deferred.reject(data);
                    });
                    return deferred.promise;
                },

                getVerifyCode: function (jsonStr) {
                    var deferred;
                    console.debug("getVerifyCode()");
                    deferred = $q.defer();
                    $http.post(baseUrl + verifyCodeUrl, jsonStr).then(function (data, status) {
                        console.info("Successfully getVerifyCode - status " + data);
                        return deferred.resolve(data);
                    }, function (data, status) {
                        console.error("Failed to getVerifyCode - status " + status);
                        return deferred.reject(data);
                    });
                    return deferred.promise;
                }
            };

            return ForgetPwdService;
        }]);