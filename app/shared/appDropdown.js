'use strict';

angular.module('app.shared').component('appDropdown', {
  templateUrl: 'app/shared/appDropdown.html',
  bindings: {
    currentApp: '@'
  }
});
