var baseUrl = "http://192.168.0.97:9008";
angular.module('myApp.services')
    .service('RegisterService', ['$http', '$q',
        function($http, $q) {
            console.log('construting RegisterService');
            var RegisterService = {

                //获取验证码
                getVerifyCode: function(jsonStr) {
                    var getVerifyUrl = '/v1/msg/verifycode';
                    var deferred;
                    console.log('getVerifyCode()');
                    deferred = $q.defer();
                    $http.post(baseUrl + getVerifyUrl, jsonStr).then(
                        function(data, status) {
                            console.log('In RegisterService.getVerifyCode(): successfully getVerifyCode -status\n' + JSON.stringify(status));
                            return deferred.resolve(data);
                        },
                        function(data, status) {
                            console.log('In RegisterService.getVerifyCode(): falied to getVerifyCode -status\n' + JSON.stringify(status));
                            return deferred.reject(data);
                        }
                    );
                    return deferred.promise;
                },

                // 服务器注册用户
                registerUser: function(jsonStr) {
                    var registerUrl = '/v1/customer';
                    var deferred;
                    console.log('');
                    deferred = $q.defer();
                    $http.post(baseUrl + registerUrl, jsonStr).then(
                        function(data, status) {
                            console.log('In RegisterService.registerUser(): successfully getVerifyCode -status\n' + JSON.stringify(status));
                            return deferred.resolve(data);
                        },
                        function(data, status) {
                            console.log('In RegisterService.registerUser(): falied to getVerifyCode -status\n' + JSON.stringify(status));
                            return deferred.reject(data);
                        }
                    );
                    return deferred.promise;
                }
            };
            return RegisterService;
        }
    ]);
