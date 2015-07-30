var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !


var Schema = mongoose.Schema;
 
// Création du schéma pour les commentaires
var userSchema = new Schema({
  username: { type: String, require: true },
   password: { type: String, require: true }
});
module.exports = mongoose.model('user', userSchema);
