var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://adm:87274121bia@viagens.rwuhgfz.mongodb.net/?retryWrites=true&w=majority&appName=viagens', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const pacienteRoute = require('./routes/paciente.route');
const tutorRoute = require('./routes/tutor.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/paciente', pacienteRoute);
app.use('/tutor', tutorRoute);
app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
});




