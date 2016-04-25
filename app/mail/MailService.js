export default function(Firebase, firebaseRefs, $firebaseArray, $firebaseObject) {

  this.get = function(key) {
    const ref = firebaseRefs.parse('mails/:userKey/:mailKey', {mailKey: key});
    return $firebaseObject(ref).$loaded();
  };

  this.list = function(folderName) {
    const ref = firebaseRefs.parse('folders/:userKey/:folder', {folder: folderName});
    return $firebaseArray(ref).$loaded();
  };

  this.save = function(mail) {
    return _prepareMail(mail)
      .then(_doSaveMail)
      .then(ref => _createPreview(ref.key(), mail, 'sent'));
  };

  this.moveToTrash = function(mail) {
    return _createPreview(mail.$id, mail, 'trash')
      .then(ref => _removePreview(ref.key(), 'sent', 'inbox'));
  };


  // Private functions

  function _prepareMail(mail) {
    mail.timestamp = Firebase.ServerValue.TIMESTAMP;

    return $firebaseObject(firebaseRefs.parse('users/:userKey')).$loaded()
      .then(user => {
        mail.sender = {id: user.$id, name: user.name};
        return mail;
      })
  }

  function _doSaveMail(mail) {
    return $firebaseArray(firebaseRefs.parse('mails/:userKey')).$add(mail);
  }

  function _createPreview(key, data, folder) {
    const ref = firebaseRefs.parse('folders/:userKey/:folder/:mailKey', {folder: folder, mailKey: key});

    const mailPreview = $firebaseObject(ref);
    mailPreview.subject = data.subject;
    mailPreview.sender = data.sender;
    mailPreview.to = data.to;
    mailPreview.timestamp = data.timestamp;

    return mailPreview.$save();
  }

  function _removePreview(key, ...folders) {
    folders.forEach(folder => {
      const ref = firebaseRefs.parse('folders/:userKey/:folder/:mailKey', {folder: folder, mailKey: key});
      $firebaseObject(ref).$remove()
    });
  }
};
