/**
 *忘记密码controller
 *方法：（获取验证码、忘记密码）
 */
angular.module('myApp.controllers')
    .controller('ForgetPwdCtrl',
        function ($scope, $state,$interval,$ionicPopup, ForgetPwdService) {
        $scope.dataInfo = {
        };
        $scope.forgetPwd = function () {
            console.debug("forgetPwd()");
            var jsonStr = "?verifyCode=" + $scope.dataInfo.verifyCode;
            return ForgetPwdService.forgetPwd(jsonStr, $scope.dataInfo.mobileId).then((function (data) {
                console.info("success to execute ForgetPwdCtrl.forgetPwd  - status: " + data.status);
                Utils.saveCustomerToken($scope.dataInfo.mobileId,data.data.value.customerToken)
                $state.go('setPwd');
            }), function (error) {
                console.error("fail to execute ForgetPwdCtrl.forgetPwd  - status: " + error.status);
                $scope.error = error.data;
            });
        };
        VerifyCode.setPara('1',$interval,$ionicPopup,ForgetPwdService,$scope);
        $scope.VerifyCode   = VerifyCode
        $scope.message = VerifyCode.message;

    });
