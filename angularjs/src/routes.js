import angular from 'angular';
import './app.component.js';
import './nested.component.js';
import '../assets/style/app.css';

angular
    .module('app')
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false,
        });

        $stateProvider
            .state('root', {
                url: '/angularjs',
                template: '<root />',
            })
            .state('root.nested', {
                url: '/nested',
                template: '<nested />',
            })
    }]);
