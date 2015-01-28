/**
 *修改密码controller
 *方法：（修改密码）
 */
angular.module('myApp.controllers')
    .controller('ModifyPwdCtrl', ['$scope', '$location', 'ModifyPwdService',
        function ($scope, $location, ModifyPwdService) {

        $scope.modifyPwd = function () {

            var header =  verifyCustomerToken($location);

            console.debug("ModifyPwd()");
            var jsonStr = "?oldPassword=" + $scope.oldPassword + "&newPassword=" + $scope.newPassword;
            return ModifyPwdService.modifyPwd(jsonStr,header).then((function (data) {
                console.info("success to execute ModifyPwdCtrl.ModifyPwd  - status: " + data.status);
                $location.path("/personalCenter");
            }), function (error) {
                console.error("fail to execute ModifyPwdCtrl.ModifyPwd  - status: " + error.status);
                $scope.error = error.data;
            });
        };
    }]);
