'use strict';

angular.module('app').component('appDropdown', {
  templateUrl: 'app/common/appDropdown.html',
  bindings: {
    currentApp: '@'
  },
  controller: function($scope) {
    this.selectApp = (app) => {
      $scope.$emit('change-app', app);
    };
  }
});
