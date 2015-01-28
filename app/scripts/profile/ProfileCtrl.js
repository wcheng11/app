angular.module('myApp.controllers')
    .controller('ProfileCtrl',['$scope', '$location', 'ProfileService', function ($scope, $location, ProfileService) {
        $scope.profileData = {};

        $scope.getProfileInfo = function () {
            console.log("getProfileInfo");
            var header = verifyLocalStorage($location);

            var jsonStr = "";

            return ProfileService.getProfile(header).then(function (data){
                console.info("success to execute ProfileCtrl.getProfile  - status: " + data.status);
                console.log(data);
            });
        };
    }
]);
