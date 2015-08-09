'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.controllers',
  'ui.router',
  'oauthApp.services',
  'LocalStorageModule',
  'ui.bootstrap'
])

.run(function() {
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/base.html',
      controller: 'AppCtrl'
    })

    .state('app.add', {
      url: '/add',
      views: {
        'menuContent': {
          templateUrl: 'templates/add.html'
        }
      }
    })

    .state('app.chef', {
      url: '/profiles/:slug',
      views: {
        'menuContent': {
          templateUrl: 'templates/guru.html',
          controller: 'GuruCtrl'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
