angular.module('app').service('MailService', function(Firebase, $firebaseArray, $firebaseObject, firebaseRef) {

  this.get = function(key) {
    return $firebaseObject(firebaseRef.getMailRef(key)).$loaded();
  };

  this.list = function(folderName) {
    return $firebaseArray(firebaseRef.getFolderRef(folderName)).$loaded();
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

    return $firebaseObject(firebaseRef.getUserRef()).$loaded()
      .then(user => {
        mail.sender = {id: user.$id, name: user.name};
        return mail;
      })
  };

  this._doSaveMail = function(mail) {
    return $firebaseArray(firebaseRef.getMailsRef()).$add(mail);
  };

  this._createPreview = function(key, data, folder) {
    var mailPreview = $firebaseObject(firebaseRef.getFolderRef(folder).child(key));
    mailPreview.subject = data.subject;
    mailPreview.sender = data.sender;
    mailPreview.to = data.to;
    mailPreview.timestamp = data.timestamp;

    return mailPreview.$save();
  };

  this._removePreview = function(key, ...folders) {
    folders.forEach(f => $firebaseObject(firebaseRef.getFolderRef(f).child(key)).$remove());
  };
});
