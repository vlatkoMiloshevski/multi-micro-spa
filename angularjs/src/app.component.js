import angular from 'angular';

angular
    .module('app')
    .component('root', {
        template: require('./app.template.html'),
        controllerAs: 'vm',
        controller: ['$http', function ($http) {
            var vm = this;
            vm.angularImg = '/angularjs/assets/angularjs-logo.jpg';

            $http.get('api/usernameList')
                .then(bindResponseDataToViewModel.bind(this), logInfo.bind(this));

            function bindResponseDataToViewModel(success) {
                vm.data = success.data;
            }

            function logInfo(data) {
                console.log(data);
            }

        }]
    });
