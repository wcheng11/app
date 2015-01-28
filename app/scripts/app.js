angular.module('myApp.common', []);
angular.module('myApp.controllers', []);
angular.module('myApp.services', []);
angular.module('myApp.models', []);
angular.module('myApp.directives', []);
angular.module('myApp.filters', []);

    angular.module('myApp', ['ionic', 'config', 'myApp.filters', 'myApp.services', 'myApp.controllers', 'myApp.directives', 'myApp.common', 'myApp.models'])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });

            //主页面显示退出提示框
            $ionicPlatform.registerBackButtonAction(function (e) {

                e.preventDefault();

                function showConfirm() {
                    var confirmPopup = $ionicPopup.confirm({
                        title: '<strong>退出应用?</strong>',
                        template: '你确定要退出应用吗?',
                        okText: '退出',
                        cancelText: '取消'
                    });

                    confirmPopup.then(function (res) {
                        if (res) {
                            ionic.Platform.exitApp();
                        } else {
                            // Don't close
                        }
                    });
                }

                // Is there a page to go back to?
                if ($location.path() == '/home' ) {
                    showConfirm();
                } else if ($rootScope.$viewHistory.backView ) {
                    console.log('currentView:', $rootScope.$viewHistory.currentView);
                    // Go back in history
                    $rootScope.$viewHistory.backView.go();
                } else {
                    // This is the last page: Show confirmation popup
                    showConfirm();
                }

                return false;
            }, 101);
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                  url: "/login",
                  templateUrl: 'templates/login.html',
                  controller: 'LoginCtrl'
                })
                // setup an abstract state for the tabs directive
                .state('home', {
                    url: "/home",
                    templateUrl: 'templates/home.html'
                })
                // setup an abstract state for the tabs directive
                .state('modifyPwd', {
                    url: "/modifyPwd",
                    templateUrl: 'templates/modifyPassword.html'
                })
                .state('setPwd', {
                    url: "/setPwd",
                    templateUrl: 'templates/setPassword.html'
                })
                .state('forgetPwd', {
                    url: "/forgetPwd",
                    templateUrl: 'templates/forgetPassword.html',
                    controller: 'ForgetPwdCtrl'
                })
                .state('personalCenter', {
                    url: "/personalCenter",
                    templateUrl: 'templates/personalCenter.html',
                    controller: 'PersonalCenterCtrl'
                })
                .state('profile', {
                    url: "/profile",
                    templateUrl: 'templates/profile.html',
                    controller: 'ProfileCtrl'
                })
                .state('register', {
                    url: "/register",
                    templateUrl: 'templates/register.html',
                    controller: 'RegisterCtrl'
                });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/login');
        });
