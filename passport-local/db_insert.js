var mongoose = require('mongoose');
var User = require('./user_model.js');


// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/profil', function(err) {
  if (err) { throw err; }
});
 
 var db = mongoose.connection;
// Création du schéma pour les commentaires

 
// On crée une instance du Model
var new_user = new User({
    pseudo:"Alexandre",
    password:"toto"
});

// On le sauvegarde dans MongoDB !
new_user.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
  // On se déconnecte de MongoDB maintenant
});
  mongoose.connection.close();