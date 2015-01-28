function verifyCustomerToken($state){
    var loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
        $state.go('login');
        return;
    }
    var user = JSON.parse(loginInfo);
    var header = {
        customerToken: user.customerToken
    };
    return header
}

function getMobileOfLocal($state){
    var loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
        $state.go('login');
    }
    var user = JSON.parse(loginInfo);
    return user.mobile;
}

function saveCustomerToken(mobile,customerToken){
    var loginInfo = {
        mobile: mobile,
        customerToken: customerToken
    };
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
}


function showPopup($scope,$ionicPopup,$timeout) {
    $scope.data = {}
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">',
        title: 'Enter Wi-Fi Password',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
            { text: 'Cancel' },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.wifi) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data.wifi;
                    }
                }
            }
        ]
    });
    myPopup.then(function(res) {
        console.log('Tapped!', res);
    });
    $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
};
// A confirm dialog
function showConfirm($ionicPopup,title,template) {
    var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: template
    });
    confirmPopup.then(function(res) {
        if(res) {
            console.log('You are sure');
        } else {
            console.log('You are not sure');
        }
    });
};

// An alert dialog
function showAlert($ionicPopup,title,template) {
    var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
    });
    alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
    });
};