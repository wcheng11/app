/**
 * 忘记密码service
 * 方法：（获取验证码、忘记密码）
 */
angular.module('myApp.services')
    .service('ModifyPwdService', ['$http', '$q', 'baseUrl', 'modifyPwdUrl',
        function ($http, $q, baseUrl, modifyPwdUrl, verifyCodeUrl) {
            console.debug("constructing ModifyPwdService");

            var ModifyPwdService = {

                // cao
                modifyPwd: function (jsonStr,header) {
                    var deferred;
                    console.debug("ModifyPwdService()");
                    deferred = $q.defer();
                    $http({
                        method: 'put',
                        url: baseUrl + modifyPwdUrl + jsonStr,
                        headers: header
                    }).then(function (data) {
                        console.info("Successfully  execute function ModifyPwd  - status: " + data.status);
                        return deferred.resolve(data);
                    }, function (data, status) {
                        console.error("Failed to execute function ModifyPwd - status: " + status);
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

            return ModifyPwdService;
        }]);