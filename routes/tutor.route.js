const express = require('express');
const app = express();
const tutorRoutes = express.Router();

let Tutor = require('../model/Tutor');

// método post para adicionar tutor 
tutorRoutes.route('/add').post(function (req, res) {
    let tutor = new Tutor(req.body);
    tutor.save()
        .then(tutor => {
            res.status(200).json({ 'status': 'success', 'mssg': 'tutor added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// método get para retornar os tutores adicionados 
tutorRoutes.route('/').get(function (req, res) {
        
    Tutor.find()
        .then(tutor => {
            res.status(200).json({'status': 'success', 'tutores': tutores})
        })
        .catch(err => {
            res.status(400).send({'status':'failure', 'mssg':'Something went wrong'})
        })
});

// método get para retornar os tutores adicionados a partir de uma requisição (nesse caso o id)
tutorRoutes.route('/tutor/:id').get(function (req, res) {
    let id = req.params.id;
    Tutor.findById(id, function (err, tutor) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'tutor': tutor });
        }
    });
});

// método put para atualizar os dados de um tutor
tutorRoutes.route('/update/:id').put(function (req, res) {
    Tutor.findById(req.params.id, function (err, tutor) {
        if (!tutor) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            tutor.nome = req.body.nome;
            tutor.email = req.body.email;
            tutor.telefone = req.body.telefone;
            tutor.cpf = req.body.cpf;

            tutor.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// método delete para apagar tutor
tutorRoutes.route('/delete/:id').delete(function (req, res) {
    Tutor.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = tutorRoutes;