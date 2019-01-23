import angular from 'angular';

angular
    .module('app')
    .component('nested', {
        template: `<div style="margin-top:20px">Nested is working!</div>`,
        controllerAs: 'vm',
        controller() {
            let vm = this;
        },
    });
