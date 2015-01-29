/**
 * 验证码公共服务
 */
var VerifyCode = (function (){
    var single;
    function getInstance() {
        if (single === undefined) {
            single = new Construct();
        }
    }

    function Construct () {

        var scope;
        this.setPara = function(verifyType,$interval,$ionicPopup,ForgetPwdService,$scope){
            this.verifyType = verifyType;
            this.$interval = $interval;
            this.$ionicPopup = $ionicPopup;
            this.ForgetPwdService = ForgetPwdService;
            scope = $scope;
            //验证码的显示信息
            scope.verifyCode = {
                message: '获取验证码',
                enable: true, // 是否可点击
                second: 0 // 倒计时 60-
            };
        };



        var resultStatus = {
            success : "0000",
            backendError : "3001",
            existedUser : "2103",
            verificationCodeError : "2202"
        };
        // 用户填写的个人信息,用于数据的双向绑定和向服务器请求的数据模型
        this.dataInfo = {
            userMobile: '',
            userVerifyCode: ''
        };

        //错误类型
        this.errors = {
            // 本地错误
            mobile: '请输入11位中国大陆手机号',
            verifyCode: '请输入4位验证码',
            dataInfo: '密码请输入6-16位字符或数字',

            // 服务器端交互
            serverError: '服务端错误,稍后再试',
            verifyCodeNotCorrect: '验证码错误',
            userAlreadyExist: '用户已存在',
            internetError:'请检查网络连接 稍后再试'
        };


        this.intervalPromise; // 倒计时
        this.cancelCountDown = function() {
            if (this.intervalPromise) {
                this.$interval.cancel(this.intervalPromise);
                scope.verifyCode = {
                    message: '获取验证码',
                    enable: true,
                    second: 0
                };
            }
        };


        //点击获取验证码
        this.getVerifyCode = function(userMobile) {
            this.dataInfo.userMobile = userMobile;
            //如果验证码可点击的话
            if (!scope.verifyCode.enable) {
                return;
            }
            //检查手机号码是否正确
            if (!this.mobileCorrect()) {
                Utils.showAlert(this.$ionicPopup,'',this.errors['mobile']);
                return;
            }
            //60秒倒计时
            var totalSecond = 60;
            scope.verifyCode.enable = false;
            // 手机号码正确
            // 从服务器获得验证码
            this.getVerifyCodeFromServer();
            scope.verifyCode.message = totalSecond + 's后重发';

            this.intervalPromise = this.$interval(function() {
                    scope.verifyCode.second++;
                    scope.verifyCode.message = (totalSecond - scope.verifyCode.second) + 's后重发';
                    if (scope.verifyCode.second === totalSecond) {
                        scope.verifyCode = {
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
        this.getVerifyCodeFromServer = function() {
            var jsonStr = {
                mobile: this.dataInfo.userMobile,
                // verifyType: 0 注册 1忘记密码 2 修改密码
                verifyType: this.verifyType
            };
            console.log(JSON.stringify(jsonStr));
            var $ionicPopup = this.$ionicPopup;
            return this.ForgetPwdService.getVerifyCode(jsonStr).then(function(data) {
                    console.log('In RegisterCtrl.getVerifyCode() success! data:\n' + JSON.stringify(data));
                    var code = data['data']['message']['code'];
                    //0000 操作成功
                    if (code == resultStatus.success) {
                        Utils.showAlert($ionicPopup,'','获取验证码成功');
                    }
                    //3001 服务端错误
                    else if (code == resultStatus.backendError) {
                        Utils.showAlert($ionicPopup,'',this.errors['serverError']);
                    }
                    // 2103 用户已存在
                    else if (code == resultStatus.existedUser) {
                        Utils.showAlert($ionicPopup,'',this.errors['userAlreadyExist']);
                        this.cancelCountDown();
                    }

                },
                function(error) {
                    // 未能和服务器交互
                    Utils.showAlert(this.$ionicPopup,'',this.error.internetError);
                    // 验证码可以重新获取
                    this.cancelCountDown();
                });
        };

        this.verifyCodeEnable = function() {
            return scope.verifyCode.enable;
        };

        this.btnEnable = function() {
            var enable =
                this.dataInfo.userMobile &&
                this.dataInfo.userVerifyCode;

            return enable;
        };

        // 检查手机格式是否正确
        this.mobileCorrect = function() {
            var mobileReg = /^\d{11}$/;
            return mobileReg.test(this.dataInfo.userMobile);
        };
        // 检查验证码格式是否正确
        this.verifyCodeCorrect = function() {
            var verifyCodeReg = /^\d{4}$/;
            return verifyCodeReg.test(this.dataInfo.userVerifyCode);
        };
    };

    getInstance();
    return single;
})();