var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !


var Schema = mongoose.Schema;
 
// Création du schéma pour les commentaires
var userSchema = new Schema({
   pseudo:String,
   password:String,
});
module.exports = mongoose.model('user', userSchema);