/**
 *修改密码controller
 *方法：（修改密码）
 */
angular.module('myApp.controllers')
    .controller('ModifyPwdCtrl',
        function ($scope, $state, $ionicPopup, ModifyPwdService) {
            $scope.dataInfo = {};
            $scope.modifyPwd = function () {
                var header = Utils.verifyCustomerToken($state);
                console.debug("ModifyPwd()");
                var jsonStr = "?oldPassword=" + $scope.dataInfo.oldPassword + "&newPassword=" + $scope.dataInfo.newPassword;
                return ModifyPwdService.modifyPwd(jsonStr, header).then((function (data) {
                    console.info("success to execute ModifyPwdCtrl.ModifyPwd  - status: " + data.status);
                    if (data.data.message.code === "0000") {
                        $state.go('personalCenter');
                    } else if (data.data.message.code === "2504") {
                        //返回旧密码错误
                        Utils.showAlert($ionicPopup, "修改密码", "原密码错误！");
                        cleanText();
                    } else if (data.data.message.code === "3001") {
                        //后端服务错误
                        Utils.showAlert($ionicPopup, "修改密码", "服务异常！");
                        cleanText();
                    } else {
                        //后端服务错误
                        Utils.showAlert($ionicPopup, "修改密码", "服务异常！");
                        cleanText();
                    };
                    function cleanText() {
                        $scope.dataInfo.oldPassword = "";
                        $scope.dataInfo.newPassword = "";
                        $scope.dataInfo.newPasswordConfirm = "";
                    };
                }), function (error) {
                    console.error("fail to execute ModifyPwdCtrl.ModifyPwd  - status: " + error.status);
                    $scope.error = error.data;
                    Utils.showAlert($ionicPopup,"登录","网络异常！");
                });
            };
        });
