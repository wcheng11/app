"use strict";

 angular.module("config", [])

.constant("ENV", {
  "name": "prod",
  "apiEndpoint": "http://api.yoursite.com/"
})

;