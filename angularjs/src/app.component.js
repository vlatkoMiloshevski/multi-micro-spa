import angular from 'angular';

angular
    .module('app')
    .component('root', {
        template: require('./app.template.html'),
        controllerAs: 'vm',
        controller: ['$http', function ($http) {
            var vm = this;
            vm.angularImg = '/angularjs/assets/angularjs-logo.jpg';

        }]
    });
