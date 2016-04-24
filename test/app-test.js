"use strict";

describe('MailApp', function() {

  beforeEach(module('app'));

  describe('UserService', function() {

    it('should do stuff', inject(function(UserService) {

    }));
  });

  describe('MailService', function() {

    let $httpBackend;
    let MailService;
    const mockUser = {
      "avatarUrl": "https://randomuser.me/api/portraits/thumb/men/7.jpg",
      "email": "erik.howell@example.com",
      "fullName": "Erik Howell",
      "id": 1
    };
    const mockInbox = {
      1: {
        id: 1,
        to: "erik.howell@example.com"
      },
      2: {
        id: 2,
        to: "erik.howell@example.com"
      }
    };
    const mockSent = {};
    const mockMails = mergeObjects(mockInbox, mockSent);

    beforeEach(inject(function(_MailService_, _$httpBackend_) {
      MailService = _MailService_;
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET('https://jsru-ng-mail-app.firebaseio.com/mails/1.json').respond(mockMails[1]);
      $httpBackend.whenGET('https://jsru-ng-mail-app.firebaseio.com/mails/.json').respond(mockMails);
    }));

    it('should get one mail', function(done) {
      MailService.getMail(1).then(function(mail) {
        expect(mail).toEqual(mockMails[1]);
        done();
      });

      $httpBackend.flush();
    });

    it('should get inbox mail list', function(done) {
      MailService.getInbox(mockUser).then(function(mails) {
        expect(mails).toEqual(normalizeToArray(mockInbox));
        done();
      });

      $httpBackend.flush();
    });
  });
});

function mergeObjects(a, b) {
  function extend(dest, from) {
    Object.getOwnPropertyNames(from).forEach(name => {
      if (!(name in dest)) {
        dest[name] = from[name];
      }
    })
  }

  const result = {};
  extend(result, a);
  extend(result, b);

  return result;
}
