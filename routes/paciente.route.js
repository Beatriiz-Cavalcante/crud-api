const express = require('express');
const app = express();
const pacienteRoutes = express.Router();

let Paciente = require('../model/Paciente');

// método post para adicionar paciente 
pacienteRoutes.route('/add').post(function (req, res) {
    let paciente = new Paciente(req.body);
    paciente.save()
        .then(paciente => {
            res.status(200).json({ 'status': 'success', 'mssg': 'paciente added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// método get para retornar os pacientes adicionados 
pacienteRoutes.route('/').get(function (req, res) {
        
    Paciente.find()
        .then(paciente => {
            res.status(200).json({'status': 'success', 'pacientes': pacientes})
        })
        .catch(err => {
            res.status(400).send({'status':'failure', 'mssg':'Something went wrong'})
        })
});

// método get para retornar os pacientes adicionados a partir de uma requisição (nesse caso o id)
pacienteRoutes.route('/paciente/:id').get(function (req, res) {
    let id = req.params.id;
    Paciente.findById(id, function (err, paciente) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'paciente': paciente });
        }
    });
});

// método put para atualizar os dados de um paciente
pacienteRoutes.route('/update/:id').put(function (req, res) {
    Paciente.findById(req.params.id, function (err, paciente) {
        if (!paciente) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            paciente.nome = req.body.nome;
            paciente.idade = req.body.idade;
            paciente.especie = req.body.especie;
            paciente.raca = req.body.raca;
            paciente.sintomas = req.body.sintomas;

            paciente.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// método delete para apagar paciente
pacienteRoutes.route('/delete/:id').delete(function (req, res) {
    Paciente.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = pacienteRoutes;