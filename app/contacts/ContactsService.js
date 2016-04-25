export default function($http, firebaseRefs, $firebaseArray, $firebaseObject) {

  this.get = function(key) {
    const ref = firebaseRefs.parse('contacts/:userKey/:mailKey', {mailKey: key});
    return $firebaseObject(ref).$loaded();
  };

  this.list = function() {
    const ref = firebaseRefs.parse('contacts/:userKey');
    return $firebaseArray(ref).$loaded();
  };

  this.save = function(contact) {
    return $firebaseArray(firebaseRefs.parse('contacts/:userKey')).$add(contact);
  };

  this.remove = function(contact) {
    const ref = firebaseRefs.parse('contacts/:userKey/:contactKey', {contactKey: contact.$id});
    return $firebaseObject(ref).$remove();
  };

  this.generateFake = function() {
    return $http.get('https://randomuser.me/api/')
      .then(res => {
        return res.data.results[0];
      });
  };
};
