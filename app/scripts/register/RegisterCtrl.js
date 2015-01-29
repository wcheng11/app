angular.module('myApp.controllers')
    .controller('RegisterCtrl',
        function($scope, $state, $interval, $ionicPopup, RegisterService) {

            var resultStatus = {
                success : "0000",
                backendError : "3001",
                existedUser : "2103",
                verificationCodeError : "2202"
            };
            // 用户填写的个人信息,用于数据的双向绑定和向服务器请求的数据模型
            $scope.newUser = {
                userMobile: '',
                userVerifyCode: '',
                userPwd: '',
                userAgreed: false
            };

            //错误类型
            $scope.errors = {
                // 本地错误
                mobile: '请输入11位中国大陆手机号',
                verifyCode: '请输入4位验证码',
                dataInfo: '密码请输入6-16位字符或数字',

                // 服务器端交互
                serverError: '服务端错误,稍后再试',
                verifyCodeNotCorrect: '验证码错误',
                userAlreadyExist: '用户已存在'
            };

            //验证码的显示信息
            $scope.verifyCode = {
                message: '获取验证码',
                enable: true, // 是否可点击
                second: 0 // 倒计时 60-
            };

            $scope.intervalPromise; // 倒计时
            $scope.cancelCountDown = function() {
                if ($scope.intervalPromise) {
                    $interval.cancel($scope.intervalPromise);
                    $scope.verifyCode = {
                        message: '获取验证码',
                        enable: true,
                        second: 0
                    };
                }
            };
            //点击获取验证码
            $scope.getVerifyCode = function() {
                //如果验证码可点击的话
                if (!$scope.verifyCode.enable) {
                    return;

                }
                //检查手机号码是否正确
                if (!$scope.mobileCorrect()) {
                  $scope.showAlert($scope.errors['mobile']);
                  return;
                }
                //60秒倒计时
                var totalSecond = 60;
                $scope.verifyCode.enable = false;
                // 手机号码正确
                // 从服务器获得验证码
                $scope.getVerifyCodeFromServer();
                $scope.verifyCode.message = totalSecond + 's后重发';

                $scope.intervalPromise = $interval(function() {
                        $scope.verifyCode.second++;
                        $scope.verifyCode.message = (totalSecond - $scope.verifyCode.second) + 's后重发';

                        if ($scope.verifyCode.second === totalSecond) {
                            $scope.verifyCode = {
                                message: '获取验证码',
                                enable: true,
                                second: 0
                            };
                        }
                    },
                    1000,
                    totalSecond
                );
            };

            // 从服务器获得验证码
            $scope.getVerifyCodeFromServer = function() {

                var jsonStr = {
                    mobile: $scope.newUser.userMobile,
                    // verifyType: 0 注册 1忘记密码 2 修改密码
                    verifyType: 0
                };

                console.log(JSON.stringify(jsonStr));
                return RegisterService.getVerifyCode(jsonStr).then(function(data) {
                        console.log('In RegisterCtrl.getVerifyCode() success! data:\n' + JSON.stringify(data));
                        var code = data['data']['message']['code'];
                        //0000 操作成功
                        if (code == resultStatus.success) {
                            $scope.showAlert('获取验证码成功!');
                        }
                        //3001 服务端错误
                        else if (code == resultStatus.backendError) {
                            $scope.showAlert($scope.errors['serverError']);
                        }
                        // 2103 用户已存在
                        else if (code == resultStatus.existedUser) {

                            $scope.showAlert($scope.errors['userAlreadyExist']);
                            $scope.cancelCountDown();
                        }

                    },
                    function(error) {
                        // 未能和服务器交互
                        $scope.showAlert('请检查网络连接 稍后再试');
                        // 验证码可以重新获取
                        $scope.cancelCountDown();
                    });
            };

            $scope.verifyCodeEnable = function() {
                return $scope.verifyCode.enable;
            };

            $scope.btnEnable = function() {

                var enable =
                    $scope.newUser.userMobile &&
                    $scope.newUser.userVerifyCode &&
                    $scope.newUser.userPwd &&
                    $scope.newUser.userAgreed;

                return enable;
            };

            // 检查手机格式是否正确
            $scope.mobileCorrect = function() {
                var mobileReg = /^\d{11}$/;
                return mobileReg.test($scope.newUser.userMobile);
            };
            // 检查验证码格式是否正确
            $scope.verifyCodeCorrect = function() {
                var verifyCodeReg = /^\d{4}$/;
                return verifyCodeReg.test($scope.newUser.userVerifyCode);
            };
            // 检查密码格式是否正确
            $scope.pwdCorrect = function() {
                var pwdReg = /^[a-zA-Z0-9]{6,16}$/;
                return pwdReg.test($scope.newUser.userPwd);
            };

            // 检查是否有错误
            $scope.registerUser = function() {

                // 分别检查手机 验证码 密码格式
                if (!$scope.mobileCorrect()) {
                    $scope.showAlert($scope.errors['mobile']);

                    return;
                }
                if (!$scope.verifyCodeCorrect()) {
                    $scope.showAlert($scope.errors['verifyCode']);
                    return;
                }

                if (!$scope.pwdCorrect()) {
                    $scope.showAlert($scope.errors['dataInfo']);
                    return;
                }
                // 服务器端注册用户
                $scope.registerUserFromServer();

            };

            // 服务器端注册用户
            $scope.registerUserFromServer = function() {

                var jsonStr = {
                    mobile: $scope.newUser.userMobile,
                    password: $scope.newUser.userPwd,
                    verifyCode: $scope.newUser.userVerifyCode
                };
                console.log(JSON.stringify(jsonStr));
                return RegisterService.registerUser(jsonStr).then(
                    function(data) {
                        console.log('In RegisterCtrl.registerUser(): success! data:\n' + JSON.stringify(data));
                        var code = data['data']['message']['code'];

                        //0000 操作成功,
                        if (code == resultStatus.success) {
                            $scope.showAlert('注册成功!');
                            var loginInfo = {
                              mobile: $scope.newUser.userMobile,
                              customerToken: data.data.value.customerToken
                            };

                            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
                            $location.path("/personalCenter");
                        }
                        // 2202 验证码错误
                        else if (code == resultStatus.verificationCodeError) {
                            $scope.showAlert($scope.errors['verifyCodeNotCorrect']);
                        }
                        // 2103 用户已存在
                        else if (code == resultStatus.existedUser) {
                            // 122222222222
                            $scope.showAlert($scope.errors['userAlreadyExist']);
                            // 验证码可以重新获取
                            $scope.cancelCountDown();
                        }

                    },
                    function(error) {
                        // 未能和服务器交互
                        $scope.showAlert('请检查网络连接 稍后再试');
                        // 验证码可以重新获取
                        $scope.cancelCountDown();
                    });

            };

            // 弹出框
            $scope.showAlert = function(errorStr) {
                var alertPopup = $ionicPopup.alert({
                    title: '', // String. The title of the popup.
                    cssClass: '', // String, The custom CSS class name
                    subTitle: '', // String (optional). The sub-title of the popup.
                    template: '<p style="text-align: center">' + errorStr + '</p>', // String (optional). The html template to place in the popup body.
                    templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                    okText: '确定', // String (default: 'OK'). The text of the OK button.
                    okType: 'alert-btn'// String (default: 'button-positive'). The type of the OK button.
                });
                alertPopup.then(function(res) {
                    console.log("弹出框: " + errorStr);
                });
            };

        }

    ]);
