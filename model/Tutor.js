const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tutor = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: Number
  },
  cpf: {
    type: String
  }
},{
    collection: 'tutor'
});

module.exports = mongoose.model('Tutor', Tutor);