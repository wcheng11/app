/**
 *个人中心controller
 *方法：（获取用户信息）
 */
angular.module('myApp.controllers')
    .controller('PersonalCenterCtrl', ['$scope', '$location', 'PersonalCenterService',
        function ($scope, $location, PersonalCenterService) {
            $scope.loginFlg = false;
            $scope.imgStyle = "img-last-child-logout";

            $scope.getUserInfo = function () {

                var header =  verifyCustomerToken($location);

                console.debug("getUserInfo()");
                return PersonalCenterService.getUserInfo(header).then((function (data) {
                    console.info("success to execute PersonalCenterCtrl.getUserInfo  - status: " + data.status);
                    $scope.loginFlg = false;
                    $scope.imgStyle = "img-last-child-logout";
                    if(data.data.message.code === "0000"){
                        $scope.user = data.data.value;
                        $scope.loginFlg = true;
                        $scope.imgStyle = "img-last-child-login";
                        $scope.lengthStyle = "name-length"+ $scope.user.name.length;

                    }else if(data.data.message.code === "2000"){
                        //token失效
                        localStorage.removeItem("loginInfo");
                        $location.path("/login");
                    }else if(data.data.message.code === "3001"){
                        // 后端服务错误
                        //todo
                    }

                }), function (error) {
                    console.error("fail to execute PersonalCenterCtrl.getUserInfo  - status: " + error.status);
                    $scope.error = error.data;
                });
            };
        }]);
