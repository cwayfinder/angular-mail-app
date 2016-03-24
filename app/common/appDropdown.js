'use strict';

angular.module('app').component('appDropdown', {
  templateUrl: 'app/common/appDropdown.html',
  controller: function($scope) {
    this.selectApp = (app) => {
      this.currentApp = app;
      $scope.$emit('change-app', app);
    };

    $scope.$on('change-app', (e, app) => {
      this.currentApp = app;
    })
  }
});