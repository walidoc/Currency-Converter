'use strict';

angular.module('myApp', [])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
      // We must whitelist the JSONP endpoint that we are using to show that we trust it
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.fixer.io/**'
      ]);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
 
  .controller('ConversionController', ['$scope','$http', function($scope, $http){ 

      $scope.rates= {};
      $http.jsonp("https://api.fixer.io/latest?base=ZAR&callback=JSON_CALLBACK")
      .success(function(response){ 
          $scope.rates = response.rates;
          $scope.toType= $scope.rates.AUD;
          $scope.fromType = $scope.rates.USD;
          $scope.fromValue =1;
          $scope.forExConvert();     
        });
        $scope.forExConvert = function(){
            $scope.toValue = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
        };   
  }]);
