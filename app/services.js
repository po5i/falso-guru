angular.module('oauthApp.services', []).factory('oauthService', function($q, $http, $rootScope, $state, localStorageService) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('DXGvaXl_gKr74jm-nkIrvI9aOko');  
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
        },
        isReady: function() {
            return (authorizationResult);
        },
        getCurrentUser: function() {
            var deferred = $q.defer();

            /*var userPromise = $http.get($rootScope.api_url+'/api/users/' + $rootScope.auth_data.id + '/',{
                headers: {'Authorization': "Token "+$rootScope.auth_data.token}
            });
            userPromise.success(function(data, status, headers, config){
                deferred.resolve(data);
            });*/

            console.log("current user de oauth:");
            authorizationResult.me().done(function(me) {
              console.log(me);
              deferred.resolve(me); //temp
            }).fail(function(err) {
              //todo when the OAuth flow failed
            });

            return deferred.promise;
        },
        connectProvider: function(backend) {
            var deferred = $q.defer();
            
            OAuth.popup(backend)
            .done(function(result) { //cache means to execute the callback if the tokens are already present
                
                    authorizationResult = result;
                    console.log(result);
                    var token;

                    //django
                    if(backend=="twitter")
                        token = "OAuthToken "+result.oauth_token+" "+result.oauth_token_secret;
                    else    //google or facebook
                        token = "OAuthToken "+result.access_token;

                    var api_backend;
                    if(backend=="google")
                        api_backend = "google-oauth2";
                    else
                        api_backend = backend;

                    
                    $http.defaults.useXDomain = true;
                    /*var loginPromise = $http.post($rootScope.api_url+'/api-token/login/' + api_backend + '/',"",{
                        headers: {'Authorization': token}
                    });

                    loginPromise.success(function(data, status, headers, config){
                        if(status > 400){
                            alert("Ha ocurrido un error "+status);
                        }
                        else{
                            //console.log(data);
                            deferred.resolve(data);

                            if(data.id){
                                $rootScope.auth_data = data;                                
                                $rootScope.authenticated = true;
                                localStorageService.set('currentUser',data);
                                localStorageService.set('backend',backend);
                            }
                            else{
                                authorizationResult = false;
                            }
                        }   
                    });
                    loginPromise.error(function(data, status, headers, config){
                        console.error("Ha ocurrido un error");
                        console.error(data);
                        authorizationResult = false;
                        deferred.resolve(data);
                    });*/

                    deferred.resolve(); //temp
            })
            .fail(function (err) {
              //handle error with err
              alert("Ha ocurrido un error: "+err);
            });
            return deferred.promise;
        },
        
        clearCache: function() {
            $rootScope.authenticated = false;
            if(typeof $rootScope.auth_data !== 'undefined'){
                /*var loginPromise = $http.get($rootScope.api_url+'/api-token/logout/',{                        
                    headers: {'Authorization': "Token "+$rootScope.auth_data.token}
                });

                loginPromise.success(function(data, status, headers, config){
                    if(status > 400){
                        alert("Ha ocurrido un error "+status);
                    }
                    else{
                        //OAuth.clearCache();
                        authorizationResult = false;
                        
                        delete $rootScope.auth_data;
                        delete $rootScope.authenticated;
                        localStorageService.clearAll();
                        
                    }  
                });
                loginPromise.error(function(data, status, headers, config){
                    console.error("Ha ocurrido un error");
                    console.error(data);
                });*/
            }
        },
    };
    
});

