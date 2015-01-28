/**
 *忘记密码controller
 *方法：（获取验证码、忘记密码）
 */
angular.module('myApp.controllers')
    .controller('ForgetPwdCtrl',
        function ($scope, $location, ForgetPwdService) {
        $scope.data = {};
        $scope.forgetPwd = function () {
            console.debug("forgetPwd()");
            var jsonStr = "?verifyCode=" + $scope.data.verifyCode;
            return ForgetPwdService.ForgetPwd(jsonStr, $scope.data.mobileId).then((function (data) {
                console.info("success to execute ForgetPwdCtrl.forgetPwd  - status: " + data.status);
                $location.path("/setPwd");
            }), function (error) {
                console.error("fail to execute ForgetPwdCtrl.forgetPwd  - status: " + error.status);
                $scope.error = error.data;
            });
        };
        $scope.getVerifyCode = function () {
            console.debug("forgetPwd()");
            var jsonStr = {
                mobile: $scope.data.mobileId,
                verifyType: '1'
            };
            return ForgetPwdService.getVerifyCode(jsonStr).then((function (data) {
                console.debug("forgetPwd  service   ");
                //todo
            }), function (error) {
                console.error("Unable to get activities: " + error.data);
                $scope.error = error.data;
            });
        };
    });
