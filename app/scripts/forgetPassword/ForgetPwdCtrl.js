/**
 *忘记密码controller
 *方法：（获取验证码、忘记密码）
 */
angular.module('myApp.controllers')
    .controller('ForgetPwdCtrl',
        function ($scope, $state, ForgetPwdService) {
        $scope.data = {};
        $scope.forgetPwd = function () {
            console.debug("forgetPwd()");
            var jsonStr = "?verifyCode=" + $scope.data.verifyCode;
            return ForgetPwdService.forgetPwd(jsonStr, $scope.data.mobileId).then((function (data) {
                console.info("success to execute ForgetPwdCtrl.forgetPwd  - status: " + data.status);
                saveCustomerToken($scope.data.mobileId,data.data.value.customerToken)
                $state.go('setPwd');
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
