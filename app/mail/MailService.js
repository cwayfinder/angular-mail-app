angular.module('app')
  .service('MailRefs', function(firebaseRef, $firebaseAuth, rootRef) {

    function getUserId() {
      return $firebaseAuth(rootRef).$getAuth().uid;
    }

    this.user = () => rootRef.child('users').child(getUserId());
    this.folder = name => rootRef.child('folders').child(getUserId()).child(name);
    this.mails = () => rootRef.child('mails').child(getUserId());
    this.mail = mailId => rootRef.child('mails').child(getUserId()).child(mailId);
  })
  .service('MailService', function(Firebase, $firebaseArray, $firebaseObject, firebaseRef, MailRefs) {

    this.get = function(key) {
      return $firebaseObject(MailRefs.mail(key)).$loaded();
    };

    this.list = function(folderName) {
      return $firebaseArray(MailRefs.folder(folderName)).$loaded();
    };

    this.save = function(mail) {
      return this._prepareMail(mail)
        .then(this._doSaveMail)
        .then(ref => this._createPreview(ref.key(), mail, 'sent'));
    };

    this.moveToTrash = function(mail) {
      return this._createPreview(mail.$id, mail, 'trash')
        .then(ref => this._removePreview(ref.key(), 'sent', 'inbox'));
    };


    // Private methods

    this._prepareMail = function(mail) {
      mail.timestamp = Firebase.ServerValue.TIMESTAMP;

      return $firebaseObject(MailRefs.user()).$loaded()
        .then(user => {
          mail.sender = {id: user.$id, name: user.name};
          return mail;
        })
    };

    this._doSaveMail = function(mail) {
      return $firebaseArray(MailRefs.mails()).$add(mail);
    };

    this._createPreview = function(key, data, folder) {
      var mailPreview = $firebaseObject(MailRefs.folder(folder).child(key));
      mailPreview.subject = data.subject;
      mailPreview.sender = data.sender;
      mailPreview.to = data.to;
      mailPreview.timestamp = data.timestamp;

      return mailPreview.$save();
    };

    this._removePreview = function(key, ...folders) {
      folders.forEach(f => $firebaseObject(MailRefs.folder(f).child(key)).$remove());
    };
  });
