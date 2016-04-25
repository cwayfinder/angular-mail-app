var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _routes = __webpack_require__(1);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	__webpack_require__(2);
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	__webpack_require__(18);
	
	var _appViewport = __webpack_require__(25);
	
	var _appViewport2 = _interopRequireDefault(_appViewport);
	
	var _topBar = __webpack_require__(26);
	
	var _topBar2 = _interopRequireDefault(_topBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app', ['ui.router', 'app.shared', 'app.security', 'app.mailbox', 'app.contacts']).run(function ($rootScope, firebaseRefs, Firebase) {
	  firebaseRefs.root = new Firebase('https://jsru-ng-mail-app.firebaseio.com');
	
	  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
	    console.debug(error);
	  });
	}).config(_routes2.default).component('appViewport', _appViewport2.default).component('topBar', _topBar2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app', {
	    abstract: true,
	    url: '/app',
	    template: '<app-viewport current-user="$ctrl.currentUser"></app-viewport>',
	    resolve: {
	      currentUser: function currentUser(authService, $firebaseObject, firebaseRefs) {
	        return authService.$requireAuth().then(function () {
	          console.log('userKey', authService.$getAuth().uid);
	          firebaseRefs.setParam('userKey', authService.$getAuth().uid);
	          return $firebaseObject(firebaseRefs.parse('users/:userKey')).$loaded();
	        });
	      }
	    },
	    controller: function controller($resolve, currentUser) {
	      this.currentUser = currentUser;
	    },
	    controllerAs: '$ctrl'
	  });
	
	  $urlRouterProvider.otherwise('/app/mailbox/folder/inbox');
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _firebaseRefs = __webpack_require__(3);
	
	var _firebaseRefs2 = _interopRequireDefault(_firebaseRefs);
	
	var _appDropdown = __webpack_require__(4);
	
	var _appDropdown2 = _interopRequireDefault(_appDropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app.shared', ['firebase']).service('firebaseRefs', _firebaseRefs2.default).component('appDropdown', _appDropdown2.default);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var _this = this;
	
	  var baseParams = {};
	
	  this.setParam = function (name, val) {
	    baseParams[name] = val;
	  };
	
	  this.parse = function (ref, params) {
	    if (!_this.root) {
	      throw new Error('Firebase root reference is not defined.');
	    }
	
	    return ref.split('/').reduce(function (res, token) {
	      return res.child(resolveToken(token, params));
	    }, _this.root);
	  };
	
	  function resolveToken(name, params) {
	    if (name.startsWith(':')) {
	      return resolveParametrisedToken(name.substring(1), params);
	    } else {
	      return name;
	    }
	  }
	
	  function resolveParametrisedToken(name, params) {
	    var val = params && params[name] ? params[name] : baseParams[name];
	    if (!val) {
	      console.log('baseParams', baseParams);
	      throw new Error('Param ' + name + ' is not defined.');
	    }
	
	    return val;
	  }
	};
	
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/shared/appDropdown.html',
	  bindings: {
	    currentApp: '@'
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _routes = __webpack_require__(6);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _authService = __webpack_require__(7);
	
	var _authService2 = _interopRequireDefault(_authService);
	
	var _login = __webpack_require__(8);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _logout = __webpack_require__(9);
	
	var _logout2 = _interopRequireDefault(_logout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app.security', ['app.shared']).run(function ($rootScope, $location, $state) {
	  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
	    if (error === 'AUTH_REQUIRED') {
	      $state.go('login');
	    }
	  });
	}).config(_routes2.default).factory('authService', _authService2.default).component('login', _login2.default).component('logout', _logout2.default);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($stateProvider) {
	  $stateProvider.state('login', {
	    url: '/login',
	    template: '<login></login>',
	    resolve: {
	      currentAuth: function currentAuth(authService, $location) {
	        return authService.$waitForAuth().then(function (authData) {
	          if (authData) {
	            $location.path('/');
	          }
	        });
	      }
	    }
	  }).state('logout', {
	    url: '/logout',
	    template: '<logout></logout>'
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($firebaseAuth, firebaseRefs) {
	  return $firebaseAuth(firebaseRefs.root);
	};
	
	;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/security/login.html',
	  controller: function controller(authService, $location, $firebaseObject, firebaseRefs) {
	    var _this = this;
	
	    this.twitterLogin = function () {
	      authService.$authWithOAuthPopup('twitter').then(function (authData) {
	        firebaseRefs.setParam('userKey', authService.$getAuth().uid);
	
	        var user = $firebaseObject(firebaseRefs.parse('users/:userKey'));
	        user.name = authData.twitter.displayName;
	        return user.$save();
	      }).then(function () {
	        return $location.path('/');
	      }).catch(function (err) {
	        return _this.errorMessage = err.code;
	      });
	    };
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  controller: function controller(authService, $location, $state) {
	    authService.$unauth();
	    $state.go('login');
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _routes = __webpack_require__(11);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _MailService = __webpack_require__(12);
	
	var _MailService2 = _interopRequireDefault(_MailService);
	
	var _mailApp = __webpack_require__(13);
	
	var _mailApp2 = _interopRequireDefault(_mailApp);
	
	var _mailEditor = __webpack_require__(14);
	
	var _mailEditor2 = _interopRequireDefault(_mailEditor);
	
	var _mailList = __webpack_require__(15);
	
	var _mailList2 = _interopRequireDefault(_mailList);
	
	var _mailPanel = __webpack_require__(16);
	
	var _mailPanel2 = _interopRequireDefault(_mailPanel);
	
	var _mailsSidebar = __webpack_require__(17);
	
	var _mailsSidebar2 = _interopRequireDefault(_mailsSidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app.mailbox', ['app.shared', 'app.security']).config(_routes2.default).service('MailService', _MailService2.default).component('mailApp', _mailApp2.default).component('mailEditor', _mailEditor2.default).component('mailList', _mailList2.default).component('mailPanel', _mailPanel2.default).component('mailsSidebar', _mailsSidebar2.default);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($stateProvider) {
	
	  var asideView = {
	    template: '<mails-sidebar selected-folder="$ctrl.folder"></mails-sidebar>',
	    controller: function controller($stateParams) {
	      this.folder = $stateParams.folder;
	    },
	    controllerAs: '$ctrl'
	  };
	
	  $stateProvider.state('app.mailbox', {
	    abstract: true,
	    url: '/mailbox',
	    template: '<mail-app user="$ctrl.currentUser"></mail-app>'
	  }).state('app.mailbox.compose', {
	    url: '/compose',
	    views: {
	      main: {
	        template: '<mail-editor></mail-editor>'
	      },
	      aside: asideView
	    }
	  }).state('app.mailbox.mail', {
	    url: '/mail/:mailKey',
	    views: {
	      main: {
	        template: '<mail-panel mail="$ctrl.mail"></mail-panel>',
	        resolve: {
	          mail: function mail($stateParams, MailService) {
	            return MailService.get($stateParams.mailKey);
	          }
	        },
	        controller: function controller($stateParams, mail) {
	          this.mail = mail;
	        },
	        controllerAs: '$ctrl'
	      },
	      aside: asideView
	    }
	  }).state('app.mailbox.folder', {
	    url: '/folder/:folder',
	    views: {
	      main: {
	        template: '<mail-list mails="$ctrl.mails" folder="{{$ctrl.folder}}"></mail-list>',
	        resolve: {
	          mails: function mails($stateParams, MailService) {
	            return MailService.list($stateParams.folder);
	          }
	        },
	        controller: function controller($stateParams, mails) {
	          this.mails = mails;
	          this.folder = $stateParams.folder;
	        },
	        controllerAs: '$ctrl'
	      },
	      aside: asideView
	    }
	  });
	};
	
	;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (Firebase, firebaseRefs, $firebaseArray, $firebaseObject) {
	
	  this.get = function (key) {
	    var ref = firebaseRefs.parse('mails/:userKey/:mailKey', { mailKey: key });
	    return $firebaseObject(ref).$loaded();
	  };
	
	  this.list = function (folderName) {
	    var ref = firebaseRefs.parse('folders/:userKey/:folder', { folder: folderName });
	    return $firebaseArray(ref).$loaded();
	  };
	
	  this.save = function (mail) {
	    return _prepareMail(mail).then(_doSaveMail).then(function (ref) {
	      return _createPreview(ref.key(), mail, 'sent');
	    });
	  };
	
	  this.moveToTrash = function (mail) {
	    return _createPreview(mail.$id, mail, 'trash').then(function (ref) {
	      return _removePreview(ref.key(), 'sent', 'inbox');
	    });
	  };
	
	  // Private functions
	
	  function _prepareMail(mail) {
	    mail.timestamp = Firebase.ServerValue.TIMESTAMP;
	
	    return $firebaseObject(firebaseRefs.parse('users/:userKey')).$loaded().then(function (user) {
	      mail.sender = { id: user.$id, name: user.name };
	      return mail;
	    });
	  }
	
	  function _doSaveMail(mail) {
	    return $firebaseArray(firebaseRefs.parse('mails/:userKey')).$add(mail);
	  }
	
	  function _createPreview(key, data, folder) {
	    var ref = firebaseRefs.parse('folders/:userKey/:folder/:mailKey', { folder: folder, mailKey: key });
	
	    var mailPreview = $firebaseObject(ref);
	    mailPreview.subject = data.subject;
	    mailPreview.sender = data.sender;
	    mailPreview.to = data.to;
	    mailPreview.timestamp = data.timestamp;
	
	    return mailPreview.$save();
	  }
	
	  function _removePreview(key) {
	    for (var _len = arguments.length, folders = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      folders[_key - 1] = arguments[_key];
	    }
	
	    folders.forEach(function (folder) {
	      var ref = firebaseRefs.parse('folders/:userKey/:folder/:mailKey', { folder: folder, mailKey: key });
	      $firebaseObject(ref).$remove();
	    });
	  }
	};
	
	;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/mail/mailApp.html'
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/mail/mailEditor.html',
	  controller: function controller(ContactsService, MailService, $state, $window) {
	    var _this = this;
	
	    this.mail = {};
	
	    this.submit = function () {
	      MailService.save(_this.mail).then(function () {
	        return $state.go('^.folder', { folder: 'sent' });
	      }).catch(function (error) {
	        return console.warn("Error:", error);
	      });
	    };
	
	    this.fakeEmail = function () {
	      ContactsService.generateFake().then(function (contact) {
	        return { to: contact.email };
	      }).then(function (mail) {
	        mail.subject = faker.directive('lorem')('%w', 3, 3);
	        mail.text = faker.directive('lorem')('%p', 3, 3);
	        return mail;
	      }).then(function (mail) {
	        _this.mail = mail;
	      });
	    };
	
	    // TODO: use a smarter approach instead of $window.history.back()
	    this.back = function () {
	      return $window.history.back();
	    };
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/mail/mailList.html',
	  bindings: {
	    folder: '@',
	    mails: '<'
	  },
	  controller: function controller(MailService, $state) {
	    var _this = this;
	
	    this.collocutor = function (mail) {
	      return _this.folder === 'sent' ? mail.to : mail.sender.name;
	    };
	
	    this.formatDate = function (timestamp) {
	      return moment(timestamp).fromNow();
	    };
	
	    this.remove = function (mail, event) {
	      event.stopPropagation();
	      MailService.moveToTrash(mail).then(_this.refresh);
	    };
	
	    this.refresh = function () {
	      return $state.go($state.current, { folder: _this.folder }, { reload: $state.current });
	    };
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/mail/mailPanel.html',
	  bindings: {
	    mail: '<'
	  },
	  controller: function controller($window) {
	    // TODO: use a smarter approach instead of $window.history.back()
	    this.back = function () {
	      return $window.history.back();
	    };
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/mail/mailsSidebar.html',
	  bindings: {
	    selectedFolder: '<'
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _routes = __webpack_require__(19);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _ContactsService = __webpack_require__(20);
	
	var _ContactsService2 = _interopRequireDefault(_ContactsService);
	
	var _contactsApp = __webpack_require__(21);
	
	var _contactsApp2 = _interopRequireDefault(_contactsApp);
	
	var _contactList = __webpack_require__(22);
	
	var _contactList2 = _interopRequireDefault(_contactList);
	
	var _contactEditor = __webpack_require__(23);
	
	var _contactEditor2 = _interopRequireDefault(_contactEditor);
	
	var _contactsSidebar = __webpack_require__(24);
	
	var _contactsSidebar2 = _interopRequireDefault(_contactsSidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app.contacts', ['app.shared', 'app.security']).config(_routes2.default).service('ContactsService', _ContactsService2.default).component('contactsApp', _contactsApp2.default).component('contactList', _contactList2.default).component('contactEditor', _contactEditor2.default).component('contactsSidebar', _contactsSidebar2.default);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($stateProvider) {
	
	  var asideView = {
	    template: '<contacts-sidebar></contacts-sidebar>'
	  };
	
	  $stateProvider.state('app.contacts', {
	    url: '/contacts',
	    abstract: true,
	    template: '<contacts-app contacts="$ctrl.contacts"></contacts-app>'
	  }).state('app.contacts.create', {
	    url: '/create',
	    views: {
	      main: {
	        template: '<contact-editor></contact-editor>'
	      },
	      aside: asideView
	    }
	  }).state('app.contacts.all', {
	    url: '/all',
	    views: {
	      main: {
	        template: '<contact-list contacts="$ctrl.contacts"></contact-list>',
	        resolve: {
	          contacts: function contacts($stateParams, ContactsService, currentUser) {
	            return ContactsService.list($stateParams.folder);
	          }
	        },
	        controller: function controller(contacts) {
	          this.contacts = contacts;
	        },
	        controllerAs: '$ctrl'
	      },
	      aside: asideView
	    }
	  });
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($http, firebaseRefs, $firebaseArray, $firebaseObject) {
	
	  this.get = function (key) {
	    var ref = firebaseRefs.parse('contacts/:userKey/:mailKey', { mailKey: key });
	    return $firebaseObject(ref).$loaded();
	  };
	
	  this.list = function () {
	    var ref = firebaseRefs.parse('contacts/:userKey');
	    return $firebaseArray(ref).$loaded();
	  };
	
	  this.save = function (contact) {
	    return $firebaseArray(firebaseRefs.parse('contacts/:userKey')).$add(contact);
	  };
	
	  this.remove = function (contact) {
	    var ref = firebaseRefs.parse('contacts/:userKey/:contactKey', { contactKey: contact.$id });
	    return $firebaseObject(ref).$remove();
	  };
	
	  this.generateFake = function () {
	    return $http.get('https://randomuser.me/api/').then(function (res) {
	      return res.data.results[0];
	    });
	  };
	};
	
	;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/contacts/contactsApp.html'
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/contacts/contactList.html',
	  bindings: {
	    contacts: '<'
	  },
	  controller: function controller(ContactsService, $state) {
	    var _this = this;
	
	    this.remove = function (contact) {
	      ContactsService.remove(contact).then(function () {
	        return _this.refresh();
	      });
	    };
	
	    this.refresh = function () {
	      return $state.go($state.current, {}, { reload: $state.current });
	    };
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/contacts/contactEditor.html',
	  controller: function controller(ContactsService, $window, $state) {
	    var _this = this;
	
	    this.contact = {};
	
	    this.submit = function () {
	      ContactsService.save(_this.contact).then(function () {
	        return $state.go('^.all');
	      }).catch(function (error) {
	        return console.warn(error);
	      });
	    };
	
	    this.fakeContact = function () {
	      function capitalize(string) {
	        return string.charAt(0).toUpperCase() + string.slice(1);
	      }
	
	      ContactsService.generateFake().then(function (fake) {
	        _this.contact.name = capitalize(fake.name.first) + ' ' + capitalize(fake.name.last);
	        _this.contact.avatarUrl = fake.picture.thumbnail;
	        _this.contact.email = fake.email;
	        _this.contact.phone = fake.phone;
	        _this.contact.company = faker.directive('company')();
	      });
	    };
	
	    // TODO: use a smarter approach instead of $window.history.back()
	    this.back = function () {
	      return $window.history.back();
	    };
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/contacts/contactsSidebar.html',
	  bindings: {
	    contacts: '<'
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/appViewport.html',
	  bindings: {
	    currentUser: '<'
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  templateUrl: 'app/topBar.html',
	  bindings: {
	    currentUser: '<'
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map