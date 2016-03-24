'use strict';

angular.module('app').component('appViewport', {
  templateUrl: 'app/appViewport.html',
  controller: function($scope, UserService) {
    function loadUsers() {
      UserService.getAll().then(users => {
        this.users = users;
        this.currentUser = this.users[0];
        $scope.$broadcast('load-user', this.currentUser);
      });
    }

    loadUsers.call(this);

    this.currentApp = 'mail';

    this.selectUser = user => {
      this.currentUser = user;
      $scope.$broadcast('load-user', user);
    };

    $scope.$on('change-app', (e, app) => this.currentApp = app);
  }
});