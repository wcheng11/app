angular.module('myApp.services')

  .service('ProfileService', ['$http', '$q', 'baseUrl', 'loginUrl', function ($http, $q, baseUrl, profileUrl) {
      console.debug("constructing Profile Service");
      var ProfileService = {
          getProfile : function ( header) {
            var deferred;
            console.debug("getProfile()");
            deferred = $q.defer();
            $http({
              method: 'get',
              url: baseUrl + profileUrl,
              headers: header
            })
              .then(function (data) {
                console.info("Success to  execute function getProfile  - status: " + data.status);
                return deferred.resolve(data);
              }, function (error) {
                console.error("fail to  execute function getProfile  - status: " + error.status);
                return deferred.reject(error);
              });
            return deferred.promise;
          }
      };
      return ProfileService;
  }
]);
