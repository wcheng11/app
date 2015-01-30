angular.module('myApp.controllers')

    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, LoginService) {
        $scope.loginData = {};

        $scope.doLogin = function () {
            console.debug("doLogin()");
            var jsonStr = "?mobile=" + $scope.loginData.userMobile + "&password=" +$scope.loginData.password;
            return LoginService.login(jsonStr).then((function (data) {
                console.debug("doLogin  service   ");
                if(data.data.message.code === "0000") {
                    Utils.saveCustomerToken($scope.loginData.userMobile,data.data.value.customerToken);
                    $state.go('personalCenter');
                }else if(data.data.message.code === "2101"){
                    //用户账户不存在
                    Utils.showAlert($ionicPopup,"登录","用户账户不存在！");
                    localStorage.removeItem("loginInfo");
                }else if(data.data.message.code === "2102"){
                    //用户密码错
                    Utils.showAlert($ionicPopup,"登录","密码错误！");
                    localStorage.removeItem("loginInfo");
                }else if(data.data.message.code === "3001"){
                    //服务端错误
                    Utils.showAlert($ionicPopup,"登录","服务异常！");
                    localStorage.removeItem("loginInfo");
                }else{
                    //服务端错误
                    Utils.showAlert($ionicPopup,"登录","服务异常！");
                    localStorage.removeItem("loginInfo");
                }

            }), function (error) {
                console.error("Unable to get activities: " + error.data);
                $scope.error = error.data;
                Utils.showAlert($ionicPopup,"登录","网络异常！");
            });
        };
    }
)
;
