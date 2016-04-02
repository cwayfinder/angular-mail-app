angular.module('app').service('UserService', function($http) {
  const baseUri = 'https://jsru-ng-mail-app.firebaseio.com/users/';

  let users;
  let currentUser;

  this.getAll = function() {
    console.debug(`load users`);

    return $http.get(baseUri + '.json')
      .then(response => normalizeToArray(response.data))
      .then(data => {
        users = data;
        return data;
      })
      .catch(error => console.error(error));
  };

  this.setCurrentUser = user => currentUser = user;
  this.getCurrentUser = () => {
    if (!currentUser) {
      currentUser = users[0];
    }
    return currentUser
  };
});
