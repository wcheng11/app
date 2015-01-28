angular.module('myApp.controllers')

    .controller('LoginCtrl',['$scope', '$location', 'LoginService', function ($scope, $location, LoginService) {
        $scope.loginData = {};

        $scope.doLogin = function () {
            console.debug("doLogin()");
            var jsonStr = "?mobile=" + $scope.loginData.userMobile + "&password=" +$scope.loginData.password;
            return LoginService.login(jsonStr).then((function (data) {
                console.debug("doLogin  service   ");
                if(data.data.message.code === "0000") {
                    var loginInfo = {
                        mobile: $scope.loginData.userMobile,
                        customerToken: data.data.value.customerToken
                    };

                    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
                    $location.path("/personalCenter");

                }else if(data.data.message.code === "3001"){
                    //todo
                    alert(data.data.message.summary);
                    localStorage.removeItem("loginInfo");
                }else{
                    localStorage.removeItem("loginInfo");
                }

            }), function (error) {
                console.error("Unable to get activities: " + error.data);
                $scope.error = error.data;
            });
        };
    }]
)
;
