angular.module('myApp.services')

  .service('ProfileService', ['$http', '$q', 'baseUrl', 'loginUrl', function ($http, $q, baseUrl, profileUrl) {
      console.debug("constructing Profile Service");
      var ProfileService = {
          getProfile : function ( header) {
            var deferred;
            console.debug("getProfile()");
            deferred = $q.defer();
            $http({
              method: 'GET',
              url: baseUrl + profileUrl,
              headers: header
            })
              .then(function (result) {
                console.info("Success to  execute function getProfile  - status: " + result.status);
                return deferred.resolve(result);
              }, function (error) {
                console.error("fail to  execute function getProfile  - status: " + error.status);
                return deferred.reject(error);
              });
            return deferred.promise;
          },

          saveProfile : function (param, header) {
              var deferred;
              console.debug("saveProfile()");
              deferred = $q.defer();
              $http({
                method: 'PUT',
                url: baseUrl + profileUrl,
                headers: header
              })
                .then(function (result) {
                    console.info("Success to  execute function getProfile  - status: " + result.status);
                    return deferred.resolve(result);
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
