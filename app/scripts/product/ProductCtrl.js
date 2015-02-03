angular.module('myApp.controllers')
    .controller('ProductCtrl', function($scope) {

        $scope.showHide = true;
        var instructions = [

            '沈志浩',
            '在提交订单之后,您还需要上传相关信息(身份证照片,学生证照片等).我们会在1-2个工作日内进行审核,审核无误后进行放款,您需要在到期之前及时还款,否则我们会收取一定的额外费用.',
        ];
        $scope.userInstruction = instructions[0];
        $scope.changeShowHide = function() {
            $scope.showHide = !$scope.showHide;
            $scope.userInstruction = instructions[$scope.showHide ? 0 : 1];
            console.log($scope.userInstruction);
            console.log($scope.showHide);
        };

        // 还款时间的感叹号 @wc
        $scope.showPrompt = false;

        $scope.lists = [
            ["test1", "test2", "test3"],
            ["test1", "test2", "test3"]
        ];

        $scope.changePrompt = function() {
            //$scope.test = angular.element(document.getElementsByClassName("pop_prompt")[0]);
            $scope.showPrompt = !$scope.showPrompt;
        };

        $scope.select = function(i) {
            angular.element(document.getElementsByClassName("rounded-selected")[0]).removeClass("rounded-selected");
            angular.element(document.getElementsByClassName("rounded-wrapper")[i]).addClass("rounded-selected");
        };

    });
