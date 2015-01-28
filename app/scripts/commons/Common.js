function verifyCustomerToken($location){
    var loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
        $location.path("/login");
    }

    var user = JSON.parse(loginInfo);

    var header = {
        customerToken: user.customerToken
    };

    return header
}

function saveCustomerToken(){

}