import angular from 'angular';
import angularLogo from '../assets/images/angularjs-logo.jpg'

angular
    .module('app')
    .component('root', {
        template: require('./app.template.html'),
        controllerAs: 'vm',
        controller: [function () {
            var vm = this;
            vm.angularImg = angularLogo;
            console.log('angularjs app component started')
        }]
    });
