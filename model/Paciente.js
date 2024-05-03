const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Paciente = new Schema({
  nome: {
    type: String
  },
  idade: {
    type: Number
  },
  especie: {
    type: String
  },
  raca: {
    type: String
  },
  sintomas: {
    type: String
  }
},{
    collection: 'paciente'
});

module.exports = mongoose.model('Paciente', Paciente);