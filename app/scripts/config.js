"use strict";

 angular.module("config", [])

.constant("ENV", {
  "name": "development",
  "apiEndpoint": "http://dev.yoursite.com:10000/"
});

angular.module('myApp')
    .constant("baseUrl","http://192.168.0.97:9008" )
    .constant("forgetUrl","/v1/customer/forgetPwd/" )
    .constant("verifyCodeUrl","/v1/msg/verifycode" )
    .constant("loginUrl","/v1/customer/login" )
    .constant("getUserUrl","/v1/customer" )
    .constant("modifyPwdUrl","/v1/password" )
    .constant("profileUrl", "/v1/customer/");
