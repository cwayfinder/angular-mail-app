angular.module('app.shared').service('firebaseRefs', function() {

  const baseParams = {};

  this.setParam = function(name, val) {
    baseParams[name] = val;
  };

  this.parse = (ref, params) => {
    if (!this.root) {
      throw new Error('Firebase root reference is not defined.');
    }

    return ref.split('/').reduce(function(res, token) {
      return res.child(resolveToken(token, params));
    }, this.root);
  };

  function resolveToken(name, params) {
    if (name.startsWith(':')) {
      return resolveParametrisedToken(name.substring(1), params);
    } else {
      return name;
    }
  }

  function resolveParametrisedToken(name, params) {
    let val = params && params[name] ? params[name] : baseParams[name];
    if (!val) {
      console.log('baseParams', baseParams);
      throw new Error(`Param ${name} is not defined.`);
    }

    return val;
  }
});
