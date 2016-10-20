const httpExample = angular.module('httpExample', ['ngFileUpload', 'ngRoute']);

httpExample.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/main.html"
        })
        .when("/getToken", {
            templateUrl : "views/getToken.html"
        })
        .when("/getAllCategory", {
            templateUrl : "views/getAllCategory.html"
        })
        .when("/getOneCategory", {
            templateUrl : "views/getOneCategory.html"
        });
});

httpExample.controller('FetchController',['$scope', '$rootScope', '$http', '$q', '$timeout', '$compile', 'Upload', function ($scope, $rootScope, $http, $q, $timeout, $compile, Upload) {
    $scope.fetch = function () {
        $http.post('http://93.171.158.114:3000/api/login', {email: '1@1.com', password: '1'})
            .then(function (response) {
                $rootScope.data = response.data.token;
            })
            .catch(function (err) {
                console.log(err)
            });
    };

    $scope.fetch2 = function () {
        $http.get('http://93.171.158.114:3000/api/dictionary/exhibitionCategory/all')
            .then(function (response) {
                $rootScope.allexhibit = response.data.data;
                for (var i = 0; i < $scope.allexhibit.length; i++) {
                    $rootScope.allexhibit[i].logo = 'http://93.171.158.114:3000' + $rootScope.allexhibit[i].logo;

                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    $scope.fetch3 = function (idExhibition) {
        $http.get('http://93.171.158.114:3000/api/dictionary/exhibitionCategory/'+idExhibition+'/select')
            .then(function (response) {
                console.log(response);
                $scope.oneExhibitLogo = response.data.data[0].logo;
                $scope.oneExhibitName = response.data.data[0].name;

            })
            .catch(function (err) {
                console.log(err);
            })
    };


    $scope.update = function(direction_category)
    {
        return $q(function(resolve, reject) {

            if (direction_category.new_logo)
            {
                direction_category.logo = direction_category.new_logo;
                Upload.upload({
                    url: 'http://93.171.158.114:3000/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',
                    data: {name: direction_category.name, file: direction_category.logo}
                })
                    .then(function(response){
                        if (response.status == 200)
                        {
                            return resolve( {error:false,message:"",data:response.data.data} );
                        }
                        else
                        {
                            return reject( {error:true,message:response.statusText} );
                        }
                    })
                    .catch(function(error){
                        return reject({error:true,message:error.statusText} );
                    });
            }
            else
            {
                console.log(direction_category);
                $http.post('http://93.171.158.114:3000/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',direction_category)
                    .then(function(response){
                        if (response.status == 200)
                        {
                            return resolve( {error:false,message:"",data:response.data.data} );
                        }
                        else
                        {
                            return reject( {error:true,message:response.statusText} );
                        }
                    })
                    .catch(function(error){
                        return reject({error:true,message:error.statusText} );
                    });
            }


        });
    };

    $scope.add = function(direction_category)
    {
        return $q(function(resolve, reject) {
            Upload.upload({
                url: 'http://93.171.158.114:3000/api/dictionary/exhibitionCategory/insert',
                data: {name: direction_category.name, file: direction_category.logo}
            })
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data} );
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });
        });
    };

}]);