angular.module('myApp.controllers', ['ionic'])
    .controller('ProfileCtrl', ['$scope', '$location', 'ProfileService', '$ionicPopup', function($scope, $location, ProfileService, $ionicPopup) {
        $scope.profileData = {};

        $scope.getProfileInfo = function() {
            console.log("getProfileInfo");
            var header = verifyCustomerToken($location);

            var jsonStr = "";

            return ProfileService.getProfile(header).then(function(data) {
                console.info("success to execute ProfileCtrl.getProfile  - status: " + data.status);
                console.log(data);
            });
        };

        $scope.saveProfileInfo = function() {
            console.log("saveProfileInfo");
            var header = verifyCustomerToken($location);
        };


        // 以下2015年1月29日新添加

        // 弹出框
        $scope.showAlert = function(errorStr) {
            var alertPopup = $ionicPopup.alert({
                title: '', // String. The title of the popup.
                cssClass: '', // String, The custom CSS class name
                subTitle: '', // String (optional). The sub-title of the popup.
                template: '<p style="text-align: center">' + errorStr + '</p>', // String (optional). The html template to place in the popup body.
                templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                okText: '确定', // String (default: 'OK'). The text of the OK button.
                okType: 'alert-btn', // String (default: 'button-positive'). The type of the OK button.

            });
            alertPopup.then(function(res) {
                console.log("弹出框: " + errorStr);
            });
        };

        $scope.user = {
            name: '',
            mobile: '',
            idCard: '',
            email: '',
            accountType: '',
            account: '',
            schoolProvince: '',
            schoolCity: '',
            school: '',
            apartment: ''
        };

        // 是否可以点击注册按钮
        $scope.registerBtnEnable = function() {

            var enable = $scope.user.name &&
                $scope.user.idCard &&
                $scope.user.email &&
                $scope.user.account &&
                $scope.user.apartment;

            return enable;

        };

        // 校验名字
        $scope.nameCorrect = function() {
            // 姓名长度为2~5汉字或2~30个字符长度
            var charLength = 0;

            for (var i = 0; i < $scope.user.name.length; i++) {
                var charTemp = $scope.user.name[i];
                var code = charTemp.charCodeAt(0);
                var single = $scope.isSingleChar(code);
                if (single) {
                    charLength += 1;
                } else {
                    // 目前不知道汉字的charCode起始值 所以字符外 都认为是汉字, 长度都认为是二
                    charLength += 2;
                }
            }
            var minLength = 2;
            var maxLength = 30;
            return (charLength >= minLength && charLength <= maxLength); // 字符范围
        };

        $scope.isSingleChar = function(charTemp) {
            var result = false;
            result = result || (charTemp === 183) // ·
                || (charTemp === 32) // 空格
                //|| (charTemp >= 48 && charTemp <= 57) // 数字
                || (charTemp >= 65 && charTemp <= 90) // 大写字母
                || (charTemp >= 97 && charTemp <= 122); // 小写字母
            return result;
        };


        // 校验身份证
        $scope.idCardCorret = function() {
            // 符合长度要求
            var length = $scope.user.idCard.length;
            var shortIdCardLen = 15;
            var longIdCardLen = 18;
            var lengthCorrect = (length === shortIdCardLen) || (length === longIdCardLen);
            if (!lengthCorrect) {
                return false;
            }

            // 符合数字要求
            for (var i = 0; i < length; i++) {
                var numTemp = $scope.user.idCard[i];
                if (!$scope.isNumber(numTemp)) {
                    return false;
                }
            }

            return true;
        };

        $scope.isNumber = function(numTemp) {
            return numTemp >= '0' && numTemp <= '9';
        };

        // 邮箱是否正确
        $scope.emailCorrect = function(emialTemp) {
            var length = emialTemp.length;
            var minLength = 5;
            var maxLength = 30;

            var emailReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+)$/;
            if (length < minLength || length > maxLength) {
                return false;
            }

            if (!emailReg.test(emialTemp)) {
                return false;
            }

            return true;
        };


        $scope.accountCorrect = function() {
            // 是否是手机
            var mobileReg = /^\d{11}$/;
            var mobileCorrect = mobileReg.test($scope.user.account);
            
            var result = mobileCorrect || $scope.emailCorrect($scope.user.account);
           
            return result;
        };

        $scope.apartmentCorrect = function() {
            var length = $scope.user.apartment.length;
            var result  = length >= 5 && length <= 30;
            return result;


        };

        $scope.errors = {

            name: '姓名错误,请重新输入',
            idCard: '身份证号错误,请重新输入',
            email: '邮箱错误,请重新输入',
            account: '支付宝账号错误,请重新输入',
            apartment: '宿舍错误,请重新输入',
            nameIdCardDontMatch: '个人信息认证失败,请确认信息是否真实一致'

        };
        $scope.submitForm = function() {

            // 检查用户名 身份证 邮箱 支付宝 学校 宿舍 是否格式正确

            if (!$scope.nameCorrect()) {
                $scope.showAlert($scope.errors.name);
                return;
            }
            if (!$scope.idCardCorret()) {
                $scope.showAlert($scope.errors.idCard);
                return;
            }
            if (!$scope.emailCorrect($scope.user.email)) {
                $scope.showAlert($scope.errors.email);
                return;
            }
            if (!$scope.accountCorrect()) {
                $scope.showAlert($scope.errors.account);
                return;
            }
            if (!$scope.apartmentCorrect()) {
                $scope.showAlert($scope.errors.apartment);
                return;
            }

            // TODO
            $scope.showAlert('校验成功');

        };



    }]);
